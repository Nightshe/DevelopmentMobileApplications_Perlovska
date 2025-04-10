import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function RowLayoutScreen() {
  return (
    //container with 3 square
    <View style={styles.container}>
      <View style={[styles.square, { backgroundColor: 'red' }]} />
      <View style={[styles.square, { backgroundColor: 'green' }]} />
      <View style={[styles.square, { backgroundColor: 'blue' }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                         //all space 
    flexDirection: 'row',           //set row horizontally from left to right
    justifyContent: 'space-around', //male equal space around
    alignItems: 'center',           //Aligns
  },
  square: {
    width: 80,
    height: 80,
  },
});
