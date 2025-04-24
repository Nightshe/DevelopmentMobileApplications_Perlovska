import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ItemListScreen from './screens/ItemListScreen';
import LocationScreen from './screens/LocationScreen';
import UserInputScreen from './screens/UserInputScreen';

export type RootStackParamList = {
  ItemList: undefined;
  Location: undefined;
  UserInput: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ItemList">
        <Stack.Screen name="ItemList" component={ItemListScreen} options={{ title: 'List of items' }} />
        <Stack.Screen name="Location" component={LocationScreen} options={{ title: 'LocationScreen' }} />
        <Stack.Screen name="UserInput" component={UserInputScreen} options={{ title: 'InputScreen' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
