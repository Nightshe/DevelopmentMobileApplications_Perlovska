import React, { useState, useCallback } from 'react';
//useState - for saving state
//useCallback — optimizes onRefresh
import { View, Text, Button, FlatList, TextInput, TouchableOpacity, StyleSheet, Switch, RefreshControl } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Item = {   //component
  id: string;
  name: string;
  price: number;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ItemList'>;
};

function generateUniqueId(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

function generateItem(index: number): Item {
  const id = generateUniqueId();
  return {
    id,
    name: `Item #${id}`,
    price: Math.floor(Math.random() * 100) + 1,
  };
}

export default function ItemListScreen({ navigation }: Props) {
  const [items, setItems] = useState<Item[]>(                 //Initializing 10 items
    Array.from({ length: 10 }, (_, i) => generateItem(i))
  );
  const [search, setSearch] = useState('');             //search row
  const [sortAsc, setSortAsc] = useState(true);         //sort by price
  const [refreshing, setRefreshing] = useState(false);  //pull-to-refresh)

  const filteredItems = items
    .filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())      //all letters lowercase...contains
    )
    .sort((a, b) => (sortAsc ? a.price - b.price : b.price - a.price));   //check variable true false

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    //setItems updates the state of the items
    //prev creates a new list
    // new array of products is created
  };

  //Pull to Refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    const newItem = generateItem(items.length + 1);
    setTimeout(() => {
      setItems((prev) => [newItem, ...prev]);
      setRefreshing(false);
    }, 1000);                                                 //to simulate delay
  }, [items]);

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.item}>
      <Text>{item.name} — {item.price} hrn</Text>
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <Text style={styles.deleteBtn}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={styles.title}>List of items</Text>

      <TextInput
        placeholder="Search..."
        value={search}
        onChangeText={setSearch}
        style={styles.input}
      />

      <View style={styles.switchContainer}>
        <Text>Sort by price: {sortAsc ? '↑' : '↓'}</Text>
        <Switch value={sortAsc} onValueChange={setSortAsc} />
      </View>

      {filteredItems.length === 0 ? (
        <Text style={styles.noItems}>Nothing found</Text>
      ) : (
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}

      <View style={{ marginTop: 20 }}>
        <Button title="Go to LocationScreen" onPress={() => navigation.navigate('Location')} />
        <Button title="Go to InputScreen" onPress={() => navigation.navigate('UserInput')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  item: {
    padding: 12,
    backgroundColor: '#f9f9f9',
    marginBottom: 8,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deleteBtn: {
    color: 'red',
  },
  noItems: {
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
    color: '#888',
  },
});
