import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export function TabNavigation({ activeTab, onTabChange }) {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'assessments' && styles.activeTab]}
        onPress={() => onTabChange('assessments')}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === 'assessments' && styles.activeTabText
          ]}
        >
          自己評価
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'comparison' && styles.activeTab]}
        onPress={() => onTabChange('comparison')}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === 'comparison' && styles.activeTabText
          ]}
        >
          症状の写真
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    gap: 15
  },
  tab: {
    flex: 1,

    alignItems: 'center',
    borderRadius: 3,
    backgroundColor: 'rgba(211, 255, 242, 1)',
   maxWidth:85,
   width:'100%',
   height:24
  },
  activeTab: {
    backgroundColor: 'rgba(25, 154, 142, 1)',
    borderRadius: 3
  },
  tabText: {
    color: '#101010',
    fontSize: 13,
    fontFamily: 'ABeeZee-Regular',
    lineHeight:24
  },
  activeTabText: {
    color: 'white'
  }
});
