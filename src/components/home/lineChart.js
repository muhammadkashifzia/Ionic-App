import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  Text,
  Dimensions
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const { width, height } = Dimensions.get('window');

console.log('Height', height);

const LineChartComponent = ({ data, onDataPointClick }) => {
  const [selectedDataPoint, setSelectedDataPoint] = useState(null);

  const dataWithFallback = Array.isArray(data)
    ? data.map(value => value?.points ?? null)
    : [];
  if (dataWithFallback.every(value => value === null)) dataWithFallback[0] = 0;

  const handleDataPointClick = ({ x, y, index }) => {
    setSelectedDataPoint({ x, y, value: data[index]?.star });
    onDataPointClick?.({ x, y, index });
  };

  const renderStars = value => '★'.repeat(value);

  return (
    <View style={styles.chartContainer}>
      <LineChart
        data={{ datasets: [{ data: dataWithFallback }] }}
        width={width * 0.98}
        height={Platform.OS === 'ios' ? 95 : 95}
        yAxisInterval={1}
        chartConfig={chartConfig}
        yLabelsOffset={100}
        xLabelsOffset={100}
        fromZero
        withVerticalLines={false}
        withHorizontalLines={false}
        segments={0}
        onDataPointClick={handleDataPointClick}
        renderDotContent={({ x, y, index }) => {
          const dataPointValue = data && data[index]?.star;
          if (dataPointValue == null || dataPointValue == undefined)
            return null;

          return (
            <View
              style={{
                flexDirection: 'column',
                gap: 10,
                backgroundColor: 'blue'
              }}
            >
              <View style={styles.dotContainer} key={`dot-${index}`}>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: Platform.OS === 'ios' ? -35 : -130,
                    paddingTop: 10
                  }}
                >
                  <View style={[styles.dot, { left: x - 5, top: y + 25 }]} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.labelWrapper}
                  key={`label-${index}`}
                >
                  <View
                    style={[
                      styles.labelContainer,
                      {
                        top:
                          Platform.OS === 'ios'
                            ? height * 0.096
                            : height * 0.49,
                        left:
                          Platform.OS === 'ios'
                            ? x - width * 0.0523
                            : x - width * 0.0423
                      }
                    ]}
                  >
                    <Text style={styles.labelText}>{dataPointValue}</Text>
                    <Text style={styles.starText}>
                      {renderStars(dataPointValue)}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
        style={styles.chart}
      />
    </View>
  );
};

const chartConfig = {
  backgroundColor: 'none',
  backgroundGradientFrom: 'white',
  backgroundGradientTo: 'none',
  decimalPlaces: 0,
  color: () => 'rgba(25, 154, 142, 1)',
  labelColor: () => 'red',
  propsForDots: { r: '0' },
  style: { borderRadius: 16 },
  useShadowColorFromDataset: false,
  fillShadowGradientFrom: 'white',
  fillShadowGradientFromOpacity: 0.1,
  fillShadowGradientTo: 'white',
  fillShadowGradientToOpacity: 0,
  yAxisLabel: ''
};

const styles = StyleSheet.create({
  chartContainer: {
    alignSelf: 'center',
    marginTop: Platform.OS === 'ios' ? -17 : -17,
    paddingBottom: 15,

    paddingHorizontal: 26,
    width: '100%',
    marginLeft: width <= 400 ? -25 : -10
  },
  chart: {
    marginLeft: 0,
    paddingRight: 30,
    width: '100%',
    paddingTop: 15
  },
  dotContainer: {
    position: 'absolute',
    bottom: 10,
    marginBottom: -5,
    backgroundColor: 'red'
  },

  dot: {
    backgroundColor: 'rgba(25, 154, 142, 1)',
    width: 10,
    height: 10,
    borderRadius: 100
  },
  labelWrapper: {
    position: 'absolute',

    // width:"100%",
    // height:100,
    top: Platform.OS === 'ios' ? -15 : height < 750 ? -400 :height < 800 ? -410 : -425
  },
  labelContainer: {
    position: 'relative',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: Platform.OS === 'ios' ? 15 : 25
  },
  labelText: {
    color: 'rgba(25, 154, 142, 1)',
    fontFamily: 'ABeeZee-Regular'
  },
  starText: {
    minWidth: 30,
    fontWeight: '400',
    fontFamily: 'ABeeZee-Regular',
    color: 'rgba(255, 208, 72, 1)',
    fontSize: 10
  }
});

export default LineChartComponent;
