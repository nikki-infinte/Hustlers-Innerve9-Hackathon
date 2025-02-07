import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import Sound from 'react-native-sound';

const HomeScreen = ({ navigation }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    // Enable playback in silent mode
    Sound.setCategory('Playback');

    // Initialize the sound
    const backgroundMusic = new Sound(
      'background_music.mp3',  // Make sure this file is in your raw folder
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log('Failed to load sound', error);
          return;
        }
        
        // Start playing
        backgroundMusic.play(success => {
          if (!success) {
            console.log('Sound playback failed');
          }
        });
        
        setSound(backgroundMusic);
      }
    );

    // Cleanup function
    return () => {
      if (sound) {
        sound.stop();
        sound.release();
      }
    };
  }, []);

  const toggleSound = () => {
    if (sound) {
      if (isPlaying) {
        sound.pause();
      } else {
        sound.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <View style={styles.container}>
      {/* Your original Lottie animation */}
      <LottieView 
        source={require('../assets/Animation_HomePage.json')}
        autoPlay 
        loop 
        style={styles.animation} 
      />

      {/* Original title */}
      <Text style={styles.title}>Soldier Run Game</Text>

      {/* Original start game button */}
      <Button 
        title="Start Game" 
        onPress={() => navigation.navigate('Game')} 
      />

      {/* Sound toggle button */}
      <TouchableOpacity 
        style={styles.soundButton} 
        onPress={toggleSound}
      >
        <Text style={styles.soundButtonText}>
          {isPlaying ? '🔊' : '🔇'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#000' 
  },
  animation: { 
    width: 200, 
    height: 200 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: 'white', 
    marginBottom: 20 
  },
  soundButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
  },
  soundButtonText: {
    fontSize: 24,
  }
});

export default HomeScreen;