import React from 'react';


// App.js
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';
import BattleField from'./screens/BattleField';
import ChooseAvatar from './screens/ChooseAvatar';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="chooseAvtar" 
          component={ChooseAvatar} 
          options={{ title: 'Choose Your Character' }}
        />
        <Stack.Screen 
          name="Game" 
          component={GameScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
        name="BattleField"
        component={BattleField}
        options={{headerShown:false}}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;