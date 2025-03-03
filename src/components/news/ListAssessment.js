import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';
import { useGetAllAssessments } from '../../hooks/useAssessments';
import { calenderSvgIcon } from '../../assets/svgsComps/unCheckSvg';
import { SvgXml } from 'react-native-svg';

import ListAssessmentShimmer from '../../shimmers/AssessmentShimmer';
const ListAssessment = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDropdown, setShowDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [selectedYear, setSelectedYear] = useState(selectedDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(
    selectedDate.getMonth() + 1
  );

  const years = Array.from(
    { length: 10 },
    (_, i) => new Date().getFullYear() - i
  );
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const { data, isPending, refetch } = useGetAllAssessments({
    selectedMonth,
    selectedYear
  });

  const [monthlyDataBackend, setMonthlyDataBackend] = useState([]);

  useEffect(() => {
    refetch();
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    if (data) {
      setMonthlyDataBackend(
        [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    }
  }, [data]);

  const handleMonthSelect = month => {
    setSelectedMonth(month);
    setSelectedDate(new Date(selectedYear, month - 1, 1));
    setShowDropdown(false);
  };

  const handleYearSelect = year => {
    setSelectedYear(year);
    setSelectedDate(new Date(year, selectedMonth - 1, 1));
    setShowYearDropdown(false);
  };
  const renderStars = count => {
    return <Text style={styles.stars}>{'★'.repeat(count)}</Text>;
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
      testID="calender-section"
        style={styles.dropdownButton}
        onPress={() => setShowDropdown(!showDropdown)}
      >
        <SvgXml  xml={calenderSvgIcon} />
      </TouchableOpacity>

      {/* <Text style={styles.dropdownText}>Hello</Text> */}
      {showDropdown && (
        <View style={styles.dropdown}>
          <TouchableOpacity
            style={styles.subDropdownButton}
            onPress={() => setShowYearDropdown(!showYearDropdown)}
          >
            <Text style={styles.dropdownText}>{`${selectedYear}年`}</Text>
            {/* <Text style={styles.dropdownText}>{`Hello`}</Text> */}
          </TouchableOpacity>

          <View style={styles.rowGap}>
            <View style={styles.yearBox}>
              {showYearDropdown && (
                <View style={[styles.yearsItem, styles.optionsRow]}>
                  {years.map(year => (
                    <TouchableOpacity
                      key={year}
                      style={[
                        styles.optionItem,
                        selectedYear === year && styles.selectedOption
                      ]}
                      onPress={() => handleYearSelect(year)}
                    >
                      <Text
                        style={[
                          styles.baseText,
                          selectedYear === year && styles.optionText
                        ]}
                      >
                        {year}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            <View style={styles.optionsRow}>
              {months.map(month => (
                <TouchableOpacity
                  key={month}
                  style={[
                    styles.optionItem,
                    selectedMonth === month && styles.selectedOption
                  ]}
                  onPress={() => handleMonthSelect(month)}
                >
                  <Text
                    style={[
                      styles.baseText,
                      selectedMonth === month && styles.optionText
                    ]}
                  >
                    {month}月
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      )}

      {isPending ? (
        <ListAssessmentShimmer />
      ) : monthlyDataBackend.length === 0 ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>No assessments available</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.listContainer}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {monthlyDataBackend?.map((assessment, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.dateText}>
                {new Date(assessment?.createdAt).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Text>
              <View style={styles.contentRow}>
                <Image
                  source={{
                    uri:
                      assessment?.nailPhoto ||
                      'https://www.cleancredit.com.au/wp-content/uploads/elementor/thumbs/credit-repair-services-australia-q7ik0kwgn0capirxtasxuvbb9wkxymk4cqjze3d2fc.jpeg'
                  }}
                  style={styles.image}
                  onError={e =>
                    console.log('Image Load Error:', e.nativeEvent.error)
                  }
                />
                <View style={styles.scoresContainer}>
                  <View style={styles.scoreRow}>
                    <Text style={styles.label}>症状の程度:</Text>
                    <View style={styles.scoreContainer}>
                      <Text style={styles.scoreText}>
                        {assessment?.pointRating}/5
                      </Text>
                    </View>
                  </View>
                  <View style={styles.scoreRow}>
                    <Text style={styles.label}>エクササイズ:</Text>
                    <View style={styles.scoreContainer}>
                      <Text style={styles.scoreText}>
                        {assessment?.starRating}/3
                      </Text>
                      {renderStars(assessment?.starRating)}
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', flex: 1 },

  monthText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

  dropdownContainer: {
    alignItems: 'center',
    marginVertical: 10
  },
  monthSelector: {
    padding: 10,
    backgroundColor: '#4CAF93',
    borderRadius: 8
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'ABeeZee-Regular',
    color: '#555'
  },
  card: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 15
  },
  dateText: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: '400',
    fontFamily: 'ABeeZee-Regular',
    lineHeight: 18.2,
    color: '#101010'
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13
  },
  image: {
    width: 69,
    height: 67,
    borderRadius: 10
  },
  scoresContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 14
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  },
  label: {
    fontSize: 13,
    color: '#000000',
    lineHeight: 16.9,
    width: 82,
    fontFamily: 'ABeeZee-Regular',

    fontWeight: '400'
  },
  scoreContainer: {
    backgroundColor: '#4CAF93',
    width: 91,
    height: 18,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scoreText: {
    color: '#EEFFFD',
    fontSize: 12,
    fontFamily: 'ABeeZee-Regular',
    fontWeight: '400',
    lineHeight: 15
  },
  stars: {
    color: '#FFD700',
    fontSize: 10,
    marginTop: -4,
    fontWeight: '400',
    fontFamily: 'ABeeZee-Regular'
  },
  messageText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'ABeeZee-Regular',
    color: '#333',
    fontStyle: 'italic'
  },
  rowGap: {
    gap: 10
  },
  yearsItem: {
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
    paddingBottom: 10
  },
  dropdownText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'ABeeZee-Regular'
  },
  dropdown: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginHorizontal: 20,
    marginTop: 10,
    position: 'absolute',
    zIndex: 10,
    right: 0,
    top: -20
  },
  subDropdownButton: {
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb'
  },
  dropdownButton: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: '-40',
    marginBottom: '20',
    width: '20',
    marginLeft: 'auto'
  },
  dropdownLabel: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'ABeeZee-Regular',
    marginBottom: 5
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },
  optionItem: {
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '30%'
  },
  selectedOption: {
    backgroundColor: '#4CAF93',
    color: '#fff'
  },
  baseText: {
    color: '#333'
  },
  optionText: {
    fontSize: 14,
    fontFamily: 'ABeeZee-Regular',
    color: '#fff'
  }
});

export default ListAssessment;
