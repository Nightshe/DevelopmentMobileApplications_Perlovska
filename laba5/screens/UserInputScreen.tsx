import React, { useState } from 'react';
import { View, Text, TextInput, Button, Switch, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { Picker } from '@react-native-picker/picker';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'UserInput'>;
};

export default function UserInputScreen({ navigation }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isAirplaneMode, setIsAirplaneMode] = useState(false);
  const [isWifiOn, setIsWifiOn] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>('M');

  //Handlers for switches
  const toggleAirplaneMode = () => {
    setIsAirplaneMode(previousState => !previousState);
    if (isWifiOn) setIsWifiOn(false);
  };

  const toggleWifi = () => {
    if (!isAirplaneMode) {
      setIsWifiOn(previousState => !previousState);
    }
  };

  //Handler for the "Submit" button
  const handleSubmit = () => {
    console.log('Username:', username);
    console.log('Password:', password);
  };


  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prevState => !prevState);
  };

  //Field
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text>Enter your name:</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginVertical: 10,
        }}
        value={username}
        onChangeText={setUsername}
        placeholder="Your username:"
      />

      <Text>Enter your password:</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginVertical: 10,
        }}
        value={password}
        onChangeText={setPassword}
        placeholder="Your password:"
        secureTextEntry={!isPasswordVisible} //If the password is hidden, set secureTextEntry to true
      />
      
      <TouchableOpacity onPress={togglePasswordVisibility}>
        <Text style={{ color: 'blue', marginBottom: 10 }}>
          {isPasswordVisible ? 'Hide password' : 'Show password'}
        </Text>
      </TouchableOpacity>

      <Text>Your username: {username}</Text>
      <Text>Your password: {isPasswordVisible ? password : '*****'}</Text>

      <View style={{ marginVertical: 10 }}>
        <Text>Airplane Mode:</Text>
        <Switch
          value={isAirplaneMode}
          onValueChange={toggleAirplaneMode}
        />
      </View>

      <View style={{ marginVertical: 10 }}>
        <Text>Wi-Fi:</Text>
        <Switch
          value={isWifiOn}
          onValueChange={toggleWifi}
          disabled={isAirplaneMode}
        />
      </View>

      <View style={{ marginVertical: 10 }}>
        <Text>Choose size:</Text>
        <Picker
          selectedValue={selectedSize}
          onValueChange={(itemValue) => setSelectedSize(itemValue)}
        >
          <Picker.Item label="S" value="S" />
          <Picker.Item label="M" value="M" />
          <Picker.Item label="L" value="L" />
          <Picker.Item label="XL" value="XL" />
        </Picker>
        <Text>Selected size: {selectedSize}</Text>
      </View>

      <Button title="Submit" onPress={handleSubmit} />

      <Button title="go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}
