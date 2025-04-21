import React from 'react';
import { View, Text, Button, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home' as never)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E9F0F4',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
