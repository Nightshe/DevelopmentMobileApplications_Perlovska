import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

//type for parameters
type RouteParams = {
  Details: { itemId: number, title: string };
};

//get param
export default function DetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RouteParams, 'Details'>>();  //Retrieve this parameter with typing

  return (
    <View style={styles.container}>
      <Text>Details</Text>
      <Text>ID: {route.params.itemId}</Text>
      <Text>Name: {route.params.title}</Text>
      <Button title="Back" onPress={() => navigation.goBack()} />
      <Button title="Go to Profile" onPress={() => navigation.navigate('Profile' as never)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                    //take full screen
    justifyContent: 'center',   //verticaly
    alignItems: 'center',       //horiz
    backgroundColor: '#F5F7FA',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',       //indent down
  },
});
