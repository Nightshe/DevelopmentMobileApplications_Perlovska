import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import SwipeableItem from '../components/SwipeableItem';

export default function SwipeListScreen() {
  const [items, setItems] = useState(
    Array.from({ length: 8 }, (_, i) => ({ id: `${i}`, text: `Swipe Me ${i + 1}` }))
  );

  const handleSwipe = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SwipeableItem text={item.text} onSwipe={() => handleSwipe(item.id)} />
        )}
      />
    </View>
  );
}
