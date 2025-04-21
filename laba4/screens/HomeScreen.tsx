import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  Details: { itemId: number, title: string };
  Profile: undefined;
};

//let TypeScript know which screens are accessible from 'Home' (own type)
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button
        title="to Details"
        onPress={() => navigation.navigate('Details', { itemId: 42, title: 'Test item' })} //nsvigation
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
