// App.js
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './Main';
import Path from './Path';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main" screenOptions={{
          headerShown: false, // Hide the header
        }}>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Path" component={Path} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
