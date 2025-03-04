import React from 'react';
import { View, StyleSheet } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

const NewsCardShimmer = ({ isLast }) => {
  return (
    <View style={[styles.card, isLast && styles.lastCard]}>
      {/* Title Shimmer */}
      <ShimmerPlaceholder style={styles.title} />

      {/* Date Shimmer */}
      <ShimmerPlaceholder style={styles.date} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderColor: 'rgba(212, 212, 216, 1)',
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingBottom: 16,
    paddingHorizontal: 25, // Padding to match NewsCard layout
    paddingTop: 10
  },
  title: {
    width: '80%',
    height: 20,
    marginBottom: 5,
    borderRadius: 5
  },
  date: {
    width: '60%',
    height: 15,
    borderRadius: 5
  },
  lastCard: {
    borderBottomWidth: 0,
    marginBottom:-10,
  }
});

export default NewsCardShimmer;
