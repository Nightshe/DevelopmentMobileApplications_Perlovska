import React from 'react';
import { View, StyleSheet, Text, Platform, Dimensions  } from 'react-native';

const { width } = Dimensions.get('window');

export default function ColumnLayoutScreen() {
  return (
    <View style={styles.container}>
      <View style={[styles.square, { backgroundColor: 'orange' }]} />
      <View style={[styles.square, { backgroundColor: 'purple' }]} />
      <View style={[styles.square, { backgroundColor: 'cyan' }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',            //set row vertically from left to right
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  square: {
    width: width / 4, //80
    height: width / 4,
  },
});
