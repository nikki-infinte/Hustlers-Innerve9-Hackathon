import React, { useState, useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, TouchableWithoutFeedback, Text, Image, Dimensions } from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;
const SOLDIER_SIZE = 50;
const OBSTACLE_SIZE = 60;
const BACKGROUND_WIDTH = WINDOW_WIDTH * 2;

const SoldierRunGame = () => {
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const soldierPosition = useRef(new Animated.Value(0)).current;
  const obstaclePosition = useRef(new Animated.Value(WINDOW_WIDTH)).current;
  const backgroundPosition = useRef(new Animated.Value(0)).current;
  const isJumping = useRef(false);

  useEffect(() => {
    if (!isGameOver) {
      let isScored = false;

      // Faster Background Scroll
      Animated.loop(
        Animated.timing(backgroundPosition, {
          toValue: -WINDOW_WIDTH,
          duration: 3000,
          useNativeDriver: true,
        })
      ).start();

      // Faster Obstacle Movement
      const gameLoop = () => {
        Animated.timing(obstaclePosition, {
          toValue: -OBSTACLE_SIZE,
          duration: 1200, // Increased speed
          useNativeDriver: true,
        }).start(() => {
          obstaclePosition.setValue(WINDOW_WIDTH);
          isScored = false;
          if (!isGameOver) {
            gameLoop();
          }
        });
      };
      gameLoop();

      // Improved Collision Detection
      const checkCollision = setInterval(() => {
        obstaclePosition.addListener(({ value }) => {
          if (value > 30 && value < 80 && soldierPosition.__getValue() > -SOLDIER_SIZE) {
            setIsGameOver(true);
            clearInterval(checkCollision);
          }
          if (value < 30 && !isScored) {
            setScore(prevScore => prevScore + 1);
            isScored = true;
          }
        });
      }, 50);

      return () => clearInterval(checkCollision);
    }
  }, [isGameOver]);

  const handleJump = () => {
    if (!isGameOver && !isJumping.current) {
      isJumping.current = true;
      Animated.sequence([
        Animated.timing(soldierPosition, {
          toValue: -180, // Higher Jump
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(soldierPosition, {
          toValue: 0,
          duration: 500, // Smooth landing
          useNativeDriver: true,
        }),
      ]).start(() => {
        isJumping.current = false;
      });
    }
  };

  const resetGame = () => {
    setIsGameOver(false);
    setScore(0);
    obstaclePosition.setValue(WINDOW_WIDTH);
    soldierPosition.setValue(0);
  };

  return (
    <TouchableWithoutFeedback onPress={handleJump}>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.background,
            { transform: [{ translateX: backgroundPosition }] }
          ]}
        >
          <Image source={require('../assets/background01.png')} style={styles.backgroundImage} />
          <Image source={require('../assets/background01.png')} style={styles.backgroundImage} />
        </Animated.View>

        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Score: {score}</Text>
        </View>

        {isGameOver ? (
          <View style={styles.gameOverContainer}>
            <Text style={styles.gameOverText}>Game Over</Text>
            <TouchableWithoutFeedback onPress={resetGame}>
              <View style={styles.resetButton}>
                <Text style={styles.resetButtonText}>Play Again</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        ) : (
          <>
            <Animated.View style={[styles.soldier, { transform: [{ translateY: soldierPosition }] }]}> 
              <Image source={require('../assets/soldier.png')} style={styles.soldierImage} resizeMode="contain" />
            </Animated.View>

            <Animated.View style={[styles.obstacle, { transform: [{ translateX: obstaclePosition }] }]}> 
              <Image source={require('../assets/obstacle.png')} style={styles.obstacleImage} resizeMode="contain" />
            </Animated.View>
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB',
    overflow: 'hidden',
  },
  background: {
    position: 'absolute',
    width: BACKGROUND_WIDTH,
    height: '100%',
    flexDirection: 'row',
  },
  backgroundImage: {
    width: WINDOW_WIDTH,
    height: '100%',
  },
  soldier: {
    width: SOLDIER_SIZE,
    height: SOLDIER_SIZE,
    position: 'absolute',
    bottom: 50,
    left: 20,
  },
  soldierImage: {
    width: '100%',
    height: '100%',
  },
  obstacle: {
    width: OBSTACLE_SIZE,
    height: OBSTACLE_SIZE,
    position: 'absolute',
    bottom: 50,
  },
  obstacleImage: {
    width: '100%',
    height: '100%',
  },
  gameOverContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOverText: {
    fontSize: 40,
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  resetButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scoreContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default SoldierRunGame;