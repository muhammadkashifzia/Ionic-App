import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import {
  graphBarIcon,
  leftArrowCalenderIcon,
  rightArrowCalenderIcon
} from '../../assets/svgsComps/checkSvg';

const CustomCalendar = ({ onWeeksChange, daysInweek }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [numberOfWeeks, setNumberOfWeeks] = useState(0);
  const [Days, setDays] = useState(null);

  const daysInMonth = (month, year) => new Date(year, month, 0).getDate();

  const renderDays = useCallback(
    (month, year) => {
      const weeksArray = []; // Array to hold weeks information
      const daysArray = []; // Array to hold the visual days
      const totalDays = daysInMonth(month + 1, year);
      const firstDayIndex = new Date(year, month, 1).getDay();

      // Calculate days from the previous month
      const prevMonthDays = daysInMonth(month, year);
      const startingPrevMonthDay = prevMonthDays - firstDayIndex + 1;

      let week = []; // To hold the days of the current week
      let weekNumber = 1; // To keep track of the week number

      // Fill empty spaces with previous month's dates
      for (let i = 0; i < firstDayIndex; i++) {
        const prevMonthDate = startingPrevMonthDay + i;
        daysArray.push(
          <View key={`empty-prev-${i}`} style={styles.dayPlaceholder}>
            <Text style={styles.disabledDayText}>{prevMonthDate}</Text>
          </View>
        );
      }

      // Add days for the current month and create week objects
      for (let day = 1; day <= totalDays; day++) {
        const isSelected =
          selectedDate.getDate() === day &&
          selectedDate.getMonth() === month &&
          selectedDate.getFullYear() === year;

        // Add the current day's information to the week array
        week.push(day);

        // If the week is complete or it's the last day of the month, create the week object and reset the week
        if ((firstDayIndex + day) % 7 === 0 || day === totalDays) {
          const weekDays = week.map(dayOfMonth => {
            const date = new Date(year, month, dayOfMonth);
            return date.toLocaleString('en-us', { weekday: 'long' }); // Get the weekday name
          });

          // Push the week information into the weeksArray
          weeksArray.push({
            weekNumber,
            weekDays
          });

          week = [];
          weekNumber++;
        }

        // Add the current day's button to the visual array
        daysArray.push(
          <TouchableOpacity
            key={`day-${day}`}
            style={[styles.dayButton, isSelected && styles.selectedDayButton]}
            onPress={() => setSelectedDate(new Date(year, month, day))}
          >
            <Text
              style={[styles.dayText, isSelected && styles.selectedDayText]}
            >
              {day}
            </Text>
          </TouchableOpacity>
        );
      }

      // Calculate the remaining days for the next month
      const remainingDays = (7 - ((firstDayIndex + totalDays) % 7)) % 7;

      // Fill empty spaces with next month's dates
      for (let i = 1; i <= remainingDays; i++) {
        daysArray.push(
          <View key={`empty-next-${i}`} style={styles.dayPlaceholder}>
            <Text style={styles.disabledDayText}>{i}</Text>
          </View>
        );
      }

      setDays(weeksArray); // Store weeksArray which contains week data
      daysInweek(weeksArray);
      onWeeksChange(weeksArray?.length, month, year); // Update the parent component with the number of weeks

      return daysArray;
    },
    [selectedDate, onWeeksChange]
  );

  const memoizedDays = useMemo(
    () => renderDays(selectedDate.getMonth(), selectedDate.getFullYear()),
    [renderDays, selectedDate]
  );

  const renderWeekDays = () => {
    const weekDays = ['日', '月', '火', '水', '木', '金', '土'];
    return weekDays.map((day, index) => (
      <Text key={`weekday-${index}`} style={styles.weekDayText}>
        {day}
      </Text>
    ));
  };

  const renderMonthHeader = () => {
    const months = [
      '1月', // January
      '2月', // February
      '3月', // March
      '4月', // April
      '5月', // May
      '6月', // June
      '7月', // July
      '8月', // August
      '9月', // September
      '10月', // October
      '11月', // November
      '12月' // December
    ];
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {year}年{months[month]}
        </Text>
        <View style={styles.navigationContainer}>
          <TouchableOpacity
            onPress={() => {
              const newDate = new Date(year, month - 1, 1);
              setSelectedDate(newDate);
              onWeeksChange(
                Days?.length,
                newDate.getMonth(),
                newDate.getFullYear()
              ); // Pass updated month and year
            }}
          >
            <Text style={styles.navButton}>
              <SvgXml xml={leftArrowCalenderIcon} />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              const newDate = new Date(year, month + 1, 1);
              setSelectedDate(newDate);
              onWeeksChange(
                Days?.length,
                newDate.getMonth(),
                newDate.getFullYear()
              ); // Pass updated month and year
            }}
          >
            <Text style={styles.navButton}>
              <SvgXml xml={rightArrowCalenderIcon} />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {renderMonthHeader()}
      <View style={{ flexDirection: 'row', width: '100%', marginLeft: -20 }}>
        <SvgXml style={{ marginTop: 30, marginRight: 12 }} xml={graphBarIcon} />
        <View style={styles.calendarContainer}>
          <View style={styles.weekDayRow}>{renderWeekDays()}</View>
          <View style={styles.daysGrid}>{memoizedDays}</View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    // marginBottom:40,
    position: 'relative'
  },
  calendarContainer: {
    width: '99%',
    marginLeft: -5,
    backgroundColor: 'transparent'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 10
  },
  headerText: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'ABeeZee-Regular',
    color: 'rgba(25, 154, 142, 1)'
  },
  navigationContainer: {
    flexDirection: 'row',
    gap: 20
  },
  navButton: {
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'ABeeZee-Regular',
    backgroundColor: 'rgba(69, 69, 69, 1)',
    color: 'white',
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 8
  },
  weekDayRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  },
  weekDayText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'ABeeZee-Regular',
    color: 'rgba(16, 16, 16, 1)',
    width: '14.28%',
    textAlign: 'left'
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start'
  },
  dayPlaceholder: {
    width: '14.28%',
    height: 110,
    padding:0,
    borderWidth: 0.5,
    borderColor: 'rgba(196, 196, 196, 1)',
    position: 'relative',
    zIndex: 999
  },
  dayButton: {
    width: '14.28%',
    // marginTop:5,
    height: 110,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderWidth: 0.5,
    borderColor: 'rgba(196, 196, 196, 1)',
    zIndex: 2,
    position: 'relative'
  },
  selectedDayButton: {
    backgroundColor: 'transparent',
    zIndex: 3
  },
  dayText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'ABeeZee-Regular',
    color: '#333'
  },
  selectedDayText: {
    color: '#333',
    fontWeight: '400',
    fontFamily: 'ABeeZee-Regular'
  },
  disabledDayText: {
    fontSize: 14,
    color: 'rgba(212, 212, 216, 1)',
    fontWeight: '400',
    fontFamily: 'ABeeZee-Regular',
    padding: 5
  }
});

export default CustomCalendar;
