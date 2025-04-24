import React, { useEffect, useState, useCallback } from 'react';
import { Platform, View, Text, Button, RefreshControl, ScrollView, Linking } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import * as Location from 'expo-location';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Location'>;
};

export default function LocationScreen({ navigation }: Props) {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);   //current location state
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);                              //pull-to-refresh

  const requestLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Location permission denied');
        setLocation(null);
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      setErrorMsg(null);
    } catch (err) {
      setErrorMsg('Error while obtaining geolocation');
    }
  };

  useEffect(() => {   //This function runs once, on mount
    requestLocation();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await requestLocation();
    setRefreshing(false);
  }, []);

  const openSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  };


  //on web maps aren’t supported
  if (Platform.OS === 'web') {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>The map is not supported in the web version</Text>
        <Button title="go Back" onPress={() => navigation.goBack()} />
        {errorMsg && errorMsg.includes('declined') && (
          <View style={{ marginTop: 12 }}>
            <Button title="Try again" onPress={requestLocation} />
          </View>
        )}
      </View>
    );
  }

  //import 
  const MapView = require('react-native-maps').default;
  const Marker = require('react-native-maps').Marker;
  const Polygon = require('react-native-maps').Polygon;

  //Kyiv coordinates
  const userLat = location?.coords.latitude ?? 50.4501;
  const userLon = location?.coords.longitude ?? 30.5234;

  const kyivMarker = {
    latitude: 50.4501,
    longitude: 30.5234,
  };

  const polygonCoords = [
    { latitude: 50.451, longitude: 30.523 },
    { latitude: 50.452, longitude: 30.524 },
    { latitude: 50.452, longitude: 30.522 },
  ];

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={{ flex: 1, height: 400 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: userLat,
            longitude: userLon,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation
          followsUserLocation
        >
          <Marker coordinate={kyivMarker} title="Kyiv" description="Capital of Ukraine" />
          <Polygon
            coordinates={polygonCoords}
            strokeColor="rgba(0,0,255,0.8)"
            fillColor="rgba(0,0,255,0.3)"
            strokeWidth={2}
          />
        </MapView>
      </View>

      <View style={{ padding: 16, alignItems: 'center' }}>
        <Text style={{ fontSize: 16, marginBottom: 8 }}>Geolocation:</Text>

        {errorMsg ? (
          <>
            <Text style={{ color: 'red' }}>{errorMsg}</Text>

            {errorMsg.includes('declined') && (
              <View style={{ marginTop: 12 }}>
                <Button title="Go to settings" onPress={openSettings} />
              </View>
            )}
          </>
        ) : location ? (
          <>
            <Text>Latitude: {location.coords.latitude.toFixed(6)}</Text>
            <Text>Longitude: {location.coords.longitude.toFixed(6)}</Text>
          </>
        ) : (
          <Text>Loading...</Text>
        )}

        <View style={{ marginTop: 20 }}>
          <Button title="go Back" onPress={() => navigation.goBack()} />
        </View>
      </View>
    </ScrollView>
  );
}
