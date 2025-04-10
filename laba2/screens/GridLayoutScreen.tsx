import React from 'react';
import { View, StyleSheet, Text, Platform, Dimensions} from 'react-native';

const { width } = Dimensions.get('window');

export default function GridLayoutScreen() {
    //array
  const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'cyan', 'pink', 'orange'];

  return (
    <View style={styles.container}>
      {colors.map((color, index) => ( //map for all elements to form screen
        <View key={index} style={[styles.square, { backgroundColor: color }]}>
          <Text style={styles.label}>{index + 1}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',                   //to the next row
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,                        //space between the content and border (inner - внутр. простір)
  },
  square: {
    width: 50,
    height: 50,
    margin: 5,                      //outer space - зовнішній простір
    justifyContent: 'center',       //I used both to don’t touch each other
    alignItems: 'center',
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
  },
});
