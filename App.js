import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MenuProvider } from './src/MenuContext';
import Main from "./src/views/Main";
import DetallePlato from './src/views/DetallePlato';
import Buscador from './src/views/Buscador';

const Stack = createStackNavigator();

export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="DetallePlato" component={DetallePlato} />
          <Stack.Screen name="Buscador" component={Buscador} />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}
