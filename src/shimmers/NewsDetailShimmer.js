import React from 'react';
import { View, StyleSheet } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

const NewsDetailShimmer = () => {
  return (
    <View style={styles.container}>
     

      {/* Card Shimmer */}
      <View style={styles.card}>
        <ShimmerPlaceholder style={styles.title} />
        <ShimmerPlaceholder style={styles.date} />
        <ShimmerPlaceholder style={styles.description} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 1)'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  arrowBack: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  headerText: {
    flex: 1,
    height: 20,
    borderRadius: 10
  },
  card: {
    backgroundColor: 'rgba(249, 249, 249, 1)',
    borderColor: 'rgba(212, 212, 216, 1)',
    borderWidth: 1,
    borderRadius: 10,
    padding: 20
  },
  title: {
    width: '80%',
    height: 20,
    marginBottom: 10,
    borderRadius: 5
  },
  date: {
    width: '60%',
    height: 15,
    marginBottom: 20,
    borderRadius: 5
  },
  description: {
    height: 100,
    borderRadius: 5
  }
});

export default NewsDetailShimmer;
