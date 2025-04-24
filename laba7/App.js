import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TouchFeedbackScreen from './screens/TouchFeedbackScreen';
import ScrollExampleScreen from './screens/ScrollExampleScreen';
import SwipeListScreen from './screens/SwipeListScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TouchFeedback">
        <Stack.Screen name="TouchFeedback" component={TouchFeedbackScreen} />
        <Stack.Screen name="ScrollExample" component={ScrollExampleScreen} />
        <Stack.Screen name="SwipeList" component={SwipeListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
