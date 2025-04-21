import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';

//type for parameters
type RouteParams = {
  Details: { itemId: number; title: string };
};

//get param
export default function DetailsScreen() {
  const route = useRoute<RouteProp<RouteParams, 'Details'>>();  //Retrieve this parameter with typing

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details</Text>
      <Text>ID: {route.params.itemId}</Text>
      <Text>Name: {route.params.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                  //take full screen
    justifyContent: 'center',   //verticaly
    alignItems: 'center',       //horiz
    backgroundColor: '#F0F4F8',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,       //indent down
  },
});
