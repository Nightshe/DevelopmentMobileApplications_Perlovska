import React, { useState } from 'react';
import { ScrollView, RefreshControl, View, Text, StyleSheet } from 'react-native';

export default function ScrollExampleScreen() {
  const [refreshing, setRefreshing] = useState(false);      //update status

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);           //= 1 sec
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {Array.from({ length: 12 }, (_, i) => (
        <View key={i} style={styles.box}>
          <Text>Item {i + 1}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 20 },
  box: {
    backgroundColor: '#AED581',
    padding: 30,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
});
