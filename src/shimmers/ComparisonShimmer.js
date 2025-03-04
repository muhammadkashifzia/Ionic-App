import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'expo-linear-gradient';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const { width } = Dimensions.get('window');

const CompareAssessmentShimmer = () => {
  return (
    <View style={styles.container}>
      {[...Array(12)].map((_, index) => (
        <View key={index} style={styles.card}>
          {/* Image Placeholder */}
          <ShimmerPlaceholder style={styles.image} autoRun duration={1500} />
          
          {/* Checkmark Placeholder */}
          <ShimmerPlaceholder style={styles.checkmark} autoRun duration={1500} />
          
          {/* Date Placeholder */}
          <ShimmerPlaceholder style={styles.date} autoRun duration={1500} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  card: {
    width: (width - 70) / 3, // Divide the width into 3 columns with spacing
    height: 120,
    padding:9,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    marginBottom: 15,
    position: 'relative',
    overflow: 'hidden',
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: '70%',
    borderRadius: 8,
  },
  checkmark: {
    width: 15,
    height: 15,
    borderRadius: 5,
    position: 'absolute',
    top: 5,
    right: 7,
  },
  date: {
    width: '80%',
    height: 15,
    borderRadius: 5,
    position: 'absolute',
    bottom: 10,
    left: '20%',
  },
});

export default CompareAssessmentShimmer;
