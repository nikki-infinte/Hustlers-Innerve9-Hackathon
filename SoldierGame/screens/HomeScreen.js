import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import Sound from 'react-native-sound';
import { LinearGradient } from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    Sound.setCategory('Playback');
    
    const backgroundMusic = new Sound(
      'background_music.mp3',
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log('Failed to load sound', error);
          return;
        }
        
        backgroundMusic.play(success => {
          if (!success) {
            console.log('Sound playback failed');
          }
        });
        
        setSound(backgroundMusic);
      }
    );

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
    <LinearGradient
      colors={['#1a2a6c', '#2C5364', '#203A43']}
      style={styles.container}
    >
      <TouchableOpacity
        style={styles.soundButton}
        onPress={toggleSound}
      >
        <Text style={styles.soundButtonText}>
          {isPlaying ? '🔊' : '🔇'}
        </Text>
      </TouchableOpacity>

      <LottieView
        source={require('../assets/Animation_HomePage.json')}
        autoPlay
        loop
        style={styles.animation}
      />

      <Text style={styles.title}>Soldier Run Game</Text>
      
      <Text style={styles.subtitle}>
        In the heart of every soldier lies an unwavering resolve. This is not just a mission; 
        it's a testament to the strength of the human spirit.
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("chooseAvtar")}
        >
          <LinearGradient
            colors={['#0396FF', '#0D47A1']}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.buttonText}>Start Game</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("BattleField")}
        >
          <LinearGradient
            colors={['#4F89DC', '#1E3C72']}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.buttonText}>BattleField</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  animation: {
    width: width * 0.6,
    height: width * 0.6,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    fontFamily: 'System',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#FFFFFF',
    marginBottom: 30,
    lineHeight: 24,
    paddingHorizontal: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
  },
  button: {
    width: width * 0.7,
    height: 55,
    borderRadius: 30,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
  soundButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    backdropFilter: 'blur(10px)',
  },
  soundButtonText: {
    fontSize: 24,
  },
});

export default HomeScreen;