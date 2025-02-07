import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Dimensions, Text, Animated, SafeAreaView, Platform, StatusBar } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';

const ChooseAvatar = ({ navigation }) => {
  const images = [
    require('../assets/army_avatar.png'),
    require('../assets/navy_avatar.png'),
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [scaleAnim] = useState(new Animated.Value(0.95));
  const [rotateAnim] = useState(new Animated.Value(0));
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  }, []);

  useEffect(() => {
    Animated.sequence([ 
      Animated.spring(scaleAnim, { 
        toValue: 1, 
        friction: 3, 
        tension: 40, 
        useNativeDriver: true 
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(rotateAnim, { 
            toValue: 1, 
            duration: 3000, 
            useNativeDriver: true 
          }),
          Animated.timing(rotateAnim, { 
            toValue: 0, 
            duration: 3000, 
            useNativeDriver: true 
          })
        ])
      ),
    ]).start();
  }, [currentIndex]);

  const handlePrevious = () => {
    scaleAnim.setValue(0.95);
    setCurrentIndex(prevIndex => prevIndex === 0 ? images.length - 1 : prevIndex - 1);
  };

  const handleNext = () => {
    scaleAnim.setValue(0.95);
    setCurrentIndex(prevIndex => prevIndex === images.length - 1 ? 0 : prevIndex + 1);
  };

  const handleConfirm = () => {
    navigation.navigate('Game', { selectedAvatar: currentIndex });
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-3deg', '3deg']
  });

  const imageSize = Math.min(dimensions.width * 0.7, dimensions.height * 0.5);
  const buttonSize = Math.min(dimensions.width * 0.15, 60);

  return (
    <LinearGradient colors={['#1a2a6c', '#2C5364', '#203A43']} style={styles.safeArea}>
      <SafeAreaView style={styles.mainContainer}>
        <Text style={[styles.title, { fontSize: dimensions.width * 0.08 }]}>
          Choose Your Soldier
        </Text>

        {/* Avatar Selection Area */}
        <View style={styles.avatarSelectionContainer}>
          <TouchableOpacity 
            style={[styles.navigationButton, { width: buttonSize, height: buttonSize }]} 
            onPress={handlePrevious}
          >
            <Text style={styles.navigationText}>{'←'}</Text>
          </TouchableOpacity>

          <Animated.View style={[styles.imageContainer, {
            transform: [{ scale: scaleAnim }, { rotate: spin }],
            width: imageSize,
            height: imageSize,
          }]}>
            <Image 
              source={images[currentIndex]} 
              style={[styles.image, { width: imageSize, height: imageSize }]} 
              resizeMode="contain" 
            />
            <View style={styles.glowEffect} />
          </Animated.View>

          <TouchableOpacity 
            style={[styles.navigationButton, { width: buttonSize, height: buttonSize }]} 
            onPress={handleNext}
          >
            <Text style={styles.navigationText}>{'→'}</Text>
          </TouchableOpacity>
        </View>

        {/* Confirm Button */}
        <TouchableOpacity
          style={[styles.button, { width: Math.min(dimensions.width * 0.7, 300), marginTop: 30 }]} // Increased gap here
          onPress={handleConfirm}
        >
          <LinearGradient
            colors={['#0396FF', '#0D47A1']}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.buttonText}>CONFIRM SELECTION</Text>
          </LinearGradient>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: '5%',
  },
  title: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    textAlign: 'center',
    paddingHorizontal: '5%',
    fontFamily: 'System',
  },
  avatarSelectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 450, // Increased the height of the container
    marginBottom: 30, // Increased the gap between the container and the buttons
  },
  imageContainer: {
   
    borderRadius: 20,
    
    height: '100%',
    marginHorizontal: 10,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  image: {
    
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  glowEffect: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
    backgroundColor: 'rgba(3, 150, 255, 0.15)',
  },
  navigationButton: {
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  navigationText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    height: 55,
    borderRadius: 30,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default ChooseAvatar;
