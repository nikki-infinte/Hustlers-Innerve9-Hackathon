import React, { useState, useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, TouchableWithoutFeedback, Text, Image, Dimensions } from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;
const SOLDIER_SIZE = 200;
const OBSTACLE_SIZE = 60;
const BACKGROUND_WIDTH = WINDOW_WIDTH * 2;

const OBSTACLES = {
  BARBED_WIRE: { height: 40, damage: 1 },
  TRENCH: { height: 80, damage: 2 },
  DEBRIS: { height: 120, damage: 3 },
};

const COLLECTIBLES = {
  MED_KIT: { points: 5, health: 10 },
  AMMO_BOX: { points: 10 },
  FLAG: { points: 20 },
};

const TERRAINS = ['jungle', 'desert', 'snow'];

const BACKGROUNDS = {
  jungle: require('../assets/jungle-background.png'),
  desert: require('../assets/desert-background.png'),
  snow: require('../assets/snow-background.png'),
};

const RANKS = ['Private', 'Corporal', 'Sergeant', 'Lieutenant', 'Captain', 'Major', 'Colonel'];

const SoldierRunGame = () => {
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(100);
  const [currentTerrain, setCurrentTerrain] = useState('jungle');
  const [rank, setRank] = useState(RANKS[0]);

  const soldierPosition = useRef(new Animated.Value(0)).current;
  const obstaclePosition = useRef(new Animated.Value(WINDOW_WIDTH)).current;
  const collectiblePosition = useRef(new Animated.Value(-100)).current;
  const backgroundPosition = useRef(new Animated.Value(0)).current;
  const isJumping = useRef(false);
  const currentObstacle = useRef(OBSTACLES.BARBED_WIRE);

  useEffect(() => {
    if (!isGameOver) {
      startGameLoop();
    }
  }, [isGameOver]);

  const startGameLoop = () => {
    Animated.loop(
      Animated.timing(backgroundPosition, {
        toValue: -WINDOW_WIDTH,
        duration: 4000,
        useNativeDriver: true,
      })
    ).start();

    const gameLoop = () => {
      currentObstacle.current = Object.values(OBSTACLES)[Math.floor(Math.random() * 3)];
      Animated.timing(obstaclePosition, {
        toValue: -OBSTACLE_SIZE,
        duration: 2000,
        useNativeDriver: true,
      }).start(() => {
        obstaclePosition.setValue(WINDOW_WIDTH);
        if (!isGameOver) gameLoop();
      });
    };
    gameLoop();

    setInterval(() => changeTerrain(), 15000);
    setInterval(() => Math.random() > 0.7 && spawnCollectible(), 5000);
  };

  const updateHealth = (damage) => {
    setHealth(prev => {
      const newHealth = prev - damage;
      if (newHealth <= 0) setIsGameOver(true);
      return newHealth;
    });
  };

  const changeTerrain = () => {
    const nextIndex = (TERRAINS.indexOf(currentTerrain) + 1) % TERRAINS.length;
    setCurrentTerrain(TERRAINS[nextIndex]);
  };

  const spawnCollectible = () => {
    collectiblePosition.setValue(WINDOW_WIDTH);
    Animated.timing(collectiblePosition, {
      toValue: -OBSTACLE_SIZE,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };

  const handleJump = () => {
    if (!isGameOver && !isJumping.current) {
      isJumping.current = true;
      Animated.sequence([
        Animated.timing(soldierPosition, {
          toValue: -150,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(soldierPosition, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => (isJumping.current = false));
    }
  };

  const updateScore = (points) => {
    setScore(prev => {
      const newScore = prev + points;
      setRank(RANKS[Math.min(Math.floor(newScore / 50), RANKS.length - 1)]);
      return newScore;
    });
  };

  const resetGame = () => {
    setIsGameOver(false);
    setScore(0);
    setHealth(100);
    setRank(RANKS[0]);
    obstaclePosition.setValue(WINDOW_WIDTH);
    soldierPosition.setValue(0);
  };

  return (
    <TouchableWithoutFeedback onPress={handleJump}>
      <View style={styles.container}>
        <Animated.View style={[styles.background, { transform: [{ translateX: backgroundPosition }] }]}>
          <Image source={BACKGROUNDS[currentTerrain]} style={styles.backgroundImage} />
          <Image source={BACKGROUNDS[currentTerrain]} style={styles.backgroundImage} />
        </Animated.View>
        <Text style={styles.score}>Score: {score} | Rank: {rank}</Text>
        <Text style={styles.health}>Health: {health}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#87CEEB', overflow: 'hidden' },
  background: { position: 'absolute', width: BACKGROUND_WIDTH, height: '100%', flexDirection: 'row' },
  backgroundImage: { width: WINDOW_WIDTH, height: '100%' },
  score: { position: 'absolute', top: 50, left: 20, fontSize: 20, color: 'white' },
  health: { position: 'absolute', top: 80, left: 20, fontSize: 20, color: 'red' },
});

export default SoldierRunGame;
