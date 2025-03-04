import React from 'react';
import { View, StyleSheet } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

const CalendarShimmer = () => {
  return (
    <View style={styles.container}>
      {/* Header Shimmer */}
      <ShimmerPlaceholder style={styles.header} />
      
      {/* Weekday Row Shimmer */}
      <View style={styles.weekDayRow}>
        {[...Array(6)].map((_, index) => (
          <ShimmerPlaceholder key={index} style={styles.weekDay} />
        ))}
      </View>
      
      {/* Days Grid Shimmer */}
      <View style={styles.daysGrid}>
        {[...Array(36)].map((_, index) => (
          <ShimmerPlaceholder key={index} style={styles.day} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    marginTop:20
  },
  header: {
    width: '60%',
    height: 20,
    marginBottom: 15,
    borderRadius: 5,
    alignSelf: 'center',
  },
  weekDayRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  weekDay: {
    width: '12%',
    height: 15,
    borderRadius: 5,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  day: {
    width: '14.28%',
    height: 90,
    borderRadius: 5,
    marginBottom: 5,
  },
});

export default CalendarShimmer;
