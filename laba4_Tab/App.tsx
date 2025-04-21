import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import ProfileScreen from './screens/ProfileScreen';

//will there be parameters or no
export type RootStackParamList = {
  Home: undefined;
  Details: { itemId: number; title: string };
  Profile: undefined;
};


const Tab = createBottomTabNavigator();

//declaration
export default function App() {
  return (
    //to wrap stack
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerTitle: 'My_App',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen
        //create tabs
          name="Details"
          component={DetailsScreen}
          initialParams={{ itemId: 42, title: 'Test item' }}
        />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
