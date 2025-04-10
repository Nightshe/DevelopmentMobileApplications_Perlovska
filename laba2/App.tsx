import React, { useState } from 'react';
import { View, Button, StyleSheet, Text, Platform, Dimensions } from 'react-native';
import RowLayoutScreen from './screens/RowLayoutScreen';
import ColumnLayoutScreen from './screens/ColumnLayoutScreen';
import GridLayoutScreen from './screens/GridLayoutScreen';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [layout, setLayout] = useState<'row' | 'column' | 'grid'>('row');  //TypeScript

  const renderLayout = () => {
    switch (layout) {
      case 'row':
        return <RowLayoutScreen />;
      case 'column':
        return <ColumnLayoutScreen />;
      case 'grid':
        return <GridLayoutScreen />;
      default:
        return null;
    }
  };

  const nextLayout = () => {    //arrow function
    setLayout(prev =>
      prev === 'row' ? 'column' : prev === 'column' ? 'grid' : 'row'    //layout status update
    );
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Current screen: {layout}</Text>
        <Button title="Switch the screen" onPress={nextLayout} />
      </View>
      {renderLayout()}
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 10,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 10,
    alignItems: 'center',
    paddingHorizontal: Platform.select({
      ios: 20, //more for iOS
      android: 10, //less for Android
    }),
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
});