//Install the necessary navigation packages through comand line

import React from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import ProfileScreen from './screens/ProfileScreen';

//will there be parameters or no
export type RootStackParamList = {
  Home: undefined;
  Details: { itemId: number, title: string };
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

//declaration
export default function App() {
  return (
    //<NavigationContainer> to wrap your stack (2.1 = 24)
    <NavigationContainer>                                         
      <Stack.Navigator initialRouteName="Home">                          
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
        //Customize the header
          name="Details"
          component={DetailsScreen}
          options={{
            title: 'Details',
            headerRight: () => (
              <Button title="Info" onPress={() => alert('Additional information')} />
            ),
          }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}