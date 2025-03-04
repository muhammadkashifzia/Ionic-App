import React from 'react';
import { View, StyleSheet } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

const ProfileShimmer = ({ isLast }) => {
  return (
    <View style={[styles.card]}>
      {/* Name Label and Shimmer */}
      <View style={styles.field}>
        <ShimmerPlaceholder style={styles.label} />
        <ShimmerPlaceholder style={styles.name} />
      </View>

      {/* Gender Label and Shimmer */}
      <View style={styles.field}>
        <ShimmerPlaceholder style={styles.label} />
        <ShimmerPlaceholder style={styles.gender} />
      </View>

      {/* Age Label and Shimmer */}
      <View style={styles.field}>
        <ShimmerPlaceholder style={styles.label} />
        <ShimmerPlaceholder style={styles.age} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    
    
    marginBottom: 20,
    paddingBottom: 16,
    // paddingHorizontal: 20, // Padding to match Profile layout
    paddingTop: 10,
    flexDirection: 'column',
  },
  field: {
    flexDirection: 'column',
    gap:4,
    marginBottom: 10
  },
  label: {
    width: '30%',
    height: 20,
    marginRight: 10,
    borderRadius: 2
  },
  name: {
    width: '100%',
    height: 48,
    borderRadius: 12
  },
  gender: {
    width: '100%',
    height: 48,
    borderRadius: 12
  },
  age: {
    width: '100%',
    height: 48,
    borderRadius: 12
  },
  lastCard: {
    borderBottomWidth: 0,
    marginBottom: -10,
  }
});

export default ProfileShimmer;