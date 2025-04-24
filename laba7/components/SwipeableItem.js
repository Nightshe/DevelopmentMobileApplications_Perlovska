import React, { useRef } from 'react';
import { ScrollView, View, Text, StyleSheet, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function SwipeableItem({ text, onSwipe }) {
  const scrollRef = useRef();           //сreate a reference to the ScrollView

  const handleScroll = (e) => {
    const x = e.nativeEvent.contentOffset.x;        //how much is scrolled by X
    if (x > SCREEN_WIDTH / 2) {
      onSwipe();
    } else {
      scrollRef.current?.scrollTo({ x: 0, animated: true });    //return
    }
  };

  return (
    //allow + the same
    <ScrollView horizontal ref={scrollRef} showsHorizontalScrollIndicator={false} onMomentumScrollEnd={handleScroll}>
      <View style={styles.item}>
        <Text>{text}</Text>
      </View>

      <View style={{ width: SCREEN_WIDTH }} />  
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  item: {
    width: SCREEN_WIDTH,
    backgroundColor: '#FFE082',
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
  },
});
