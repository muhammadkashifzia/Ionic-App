/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { RadioButton } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useFormikContext } from 'formik';

const { width, height } = Dimensions.get('window');

export function TakeAssessment({ onAssessmentChange }) {
  const { values, errors, setFieldValue, validateField, submitCount } =
    useFormikContext();

  const handleSeveritySelect = index => {
    setFieldValue('severity', index);
    validateField('severity');
  };

  const handleStarPress = rating => {
    setFieldValue('exercise', rating);
    validateField('exercise');
  };

  return (
    <View style={styles.container}>
      {/* Severity Assessment */}
      <View testID="severity-section" style={styles.sectionAbove}>
        <Text style={styles.assessTextAbove}>
          今日の身体集中反復行動（皮膚むしり、爪噛み、抜毛、その他）の重症度はどれくらいですか？0~5点の範囲で評価してください。
        </Text>
        <LinearGradient
          colors={['#1D963F', '#FF7100', '#FF0000']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <View style={styles.scaleLabels}>
            <Text style={styles.scaleText}>軽度</Text>
            <Text style={styles.scaleText}>重度</Text>
          </View>
        </LinearGradient>
        <View style={styles.radioGroup}>
          {[...Array(6)].map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSeveritySelect(index)}
              testID={`severity-${index}`} // 🆕 Unique ID for each severity option
            >
              <View style={styles.radioItem}>
                <Text
                  style={{
                    fontFamily: 'ABeeZee-Regular',
                    fontWeight: '400',
                    color: values.severity === index ? '#199A8E' : '#000'
                  }}
                >
                  {index}
                </Text>
                <RadioButton.Android
                  value={`${index}`}
                  status={values.severity === index ? 'checked' : 'unchecked'}
                  onPress={() => handleSeveritySelect(index)}
                  uncheckedColor={
                    errors.severity && submitCount > 0 ? '#ff3333' : '#9CA3AF'
                  }
                  color="#199A8E"
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
        {submitCount > 0 && errors.severity && (
          <Text testID="severity-error" style={styles.errorText}>{errors.severity}</Text>
        )}
      </View>

      {/* Exercise Rating */}
      <View testID="exercise-section" style={styles.section}>
        <Text style={styles.assessText}>
          今日、エクササイズにどの程度取り組めましたか？
        </Text>
        <LinearGradient
          colors={['#FF0000', '#FF7100', '#1D963F']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientStar}
        >
          <View style={styles.scaleLabels}>
            <Text style={styles.scaleText}>全くできなかった</Text>
            <Text style={styles.scaleText}>目標通りできた</Text>
          </View>
        </LinearGradient>
        <View style={styles.starsContainer}>
          {[...Array(4)].map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleStarPress(index)}
              testID={`exercise-${index}`} // 🆕 Unique ID for each exercise option
              style={[
                styles.ratingSegment,
                values.exercise === index && styles.selectedSegment,
                index === 0 && { borderLeftWidth: 0 }
              ]}
            >
              <Text
                style={[
                  styles.ratingNumber,
                  values.exercise === index && styles.selectedRatingSegment
                ]}
              >
                {index}
              </Text>
              {[...Array(index)].map((_, starIndex) => (
                <Ionicons
                  key={starIndex}
                  name={values.exercise === index ? 'star' : 'star-outline'}
                  size={17}
                  color={values.exercise === index ? '#FFD700' : '#FFB800'}
                />
              ))}
              {index === 0 && (
                <Ionicons
                  key="zero-star"
                  name="star-outline"
                  size={17}
                  color="#D0D5DD"
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
        {submitCount > 0 && errors.exercise && (
          <Text testID="exercise-error" style={styles.errorText}>{errors.exercise}</Text>
        )}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  sectionAbove: {
    backgroundColor: '#F3F3F3',
    borderRadius: 12,
    fontFamily: 'ABeeZee-Regular',
    paddingLeft: 10,
    paddingRight:12,
    paddingTop: 10,
    paddingBottom: 15,
    marginBottom: 20
  },
  section: {
    backgroundColor: '#F3F3F3',
    borderRadius: 12,
    fontFamily: 'ABeeZee-Regular',
    paddingLeft: 10,
    paddingRight:11,
    paddingTop: 10,
    paddingBottom: 22,
    marginBottom: 20
  },
  assessTextAbove: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'ABeeZee-Regular',
    marginBottom: 34,
    color: '#111827'
  },
  assessText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'ABeeZee-Regular',
    marginBottom: 16,
    color: '#111827'
  },
  gradient: {
   
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 12
  },
  gradientStar: {
  
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  scaleLabels: {
    flexDirection: 'row',
    alignItems: 'center',

    // marginTop: width <= 400 ? -3 : 0,  
    justifyContent: 'space-between'
  },
  scaleText: {
    fontSize: 10,
    fontWeight: '400',
    fontFamily: 'ABeeZee-Regular',
    color: '#ffffff',
    lineHeight:22,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  radioItem: {
    marginLeft: -3,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  starsContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgba(160, 160, 160, 1)',
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 12
  },
  ratingSegment: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2.5,
    flex: 1,
    borderLeftColor: 'rgba(160, 160, 160, 1)',
    borderLeftWidth: 1
  },
  ratingNumber: {
    marginRight: 2.5,
    fontFamily: 'ABeeZee-Regular',
    fontSize: 14,
    lineHeight:22,
    paddingTop: 3,
    fontWeight: '400'
  },
  selectedSegment: {
    backgroundColor: '#199A8E',
    color: 'white'
  },
  selectedRatingSegment: {
    backgroundColor: '#199A8E',
    color: 'white'
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1
  }
});
