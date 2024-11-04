import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from "./src/views/Home";
import DetallePlato from './src/views/DetallePlato';
import Buscador from './src/views/Buscador';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="DetallePlato" component={DetallePlato} />
        <Stack.Screen name="Busqueda" component={Buscador} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
