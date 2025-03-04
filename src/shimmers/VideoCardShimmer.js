import React from 'react';
import { View, StyleSheet } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

const VideoCardShimmer = () => {
  return (
    <View style={styles.card}>
      {/* Thumbnail Shimmer */}
      <ShimmerPlaceholder style={styles.thumbnail} />
      
      {/* Title Shimmer */}
      <ShimmerPlaceholder style={styles.title} />
      
      {/* Description Shimmer */}
      <ShimmerPlaceholder style={styles.description} />
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
    paddingTop: 10
  },
  thumbnail: {
    width: '100%',
    height: 200, // Assuming a standard thumbnail height
    marginBottom: 10,
    borderRadius: 5
  },
  title: {
    width: '80%',
    height: 20,
    marginBottom: 5,
    borderRadius: 5
  },
  description: {
    width: '100%',
    height: 15,
    borderRadius: 5
  }
});

export default VideoCardShimmer;