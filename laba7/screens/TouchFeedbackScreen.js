import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, Pressable, Alert, Button } from 'react-native';

export default function TouchFeedbackScreen({ navigation }) {
  const [pressText, setPressText] = useState('Default Text');

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => Alert.alert('Opacity Pressed')}
      >
        <Text>Opacity</Text>
      </TouchableOpacity>

      <TouchableHighlight
        style={[styles.button, { backgroundColor: '#FFD54F' }]}
        underlayColor="#FFB300"
        onPress={() => Alert.alert('Highlight Pressed')}
      >
        <Text>Highlight</Text>
      </TouchableHighlight>

      <Pressable
        style={[styles.button, { backgroundColor: '#80CBC4' }]}
        onPressIn={() => setPressText('Pressed')}
        onLongPress={() => setPressText('Long Pressed')}
        onPressOut={() => setPressText('Default Text')}
      >
        <Text>{pressText}</Text>
      </Pressable>
      <View style={styles.navButtons}>
        <Button
          title="Go to Scroll Example"
          onPress={() => navigation.navigate('ScrollExample')}
        />
        <Button
          title="Go to Swipe List"
          onPress={() => navigation.navigate('SwipeList')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  button: {
    padding: 20,
    margin: 10,
    backgroundColor: '#90CAF9',
    borderRadius: 10,
  },
  navButtons: {
    marginTop: 30,
    width: '80%',
  }
});
