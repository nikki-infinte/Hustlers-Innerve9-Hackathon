import React from 'react';
import { View, ScrollView, ImageBackground, StyleSheet, Text, Animated } from 'react-native';

const GameScreen = () => {
  const scrollY = new Animated.Value(0);

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../assets/background_02.jpg')} // You'll need to add your background image
        style={styles.background}
      >
        <ScrollView
          style={styles.scrollContainer}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        >
          <Text style={styles.text}>Soldier Game</Text>
          {/* Add more game content here */}
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    flex: 1,
    paddingTop: 100,
    paddingBottom: 100,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default GameScreen;