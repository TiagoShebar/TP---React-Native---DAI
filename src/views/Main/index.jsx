import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import Plato from '../../components/Plato';

const Main = ({ navigation }) => {
  const [menu, setMenu] = useState([]);

  const handleTogglePlato = (plato) => {
    if (menu.some(item => item.id === plato.id)) {
      eliminarDelMenu(plato.id);
      return "Success"; // Mensaje para eliminar
    } else {
      const response = agregarAlMenu(plato);
      return response;
    }
  };

  const agregarAlMenu = (plato) => {
    if (menu.length === 4) {
      Alert.alert("El menú está al máximo de platos (4)");
      return;
    }

    const veganoCount = menu.filter(p => p.vegan).length;
    const noVeganoCount = menu.filter(p => !p.vegan).length;

    if ((plato.vegan && veganoCount >= 2) || (!plato.vegan && noVeganoCount >= 2)) {
      Alert.alert("El menú puede tener como máximo dos veganos y dos no veganos.");
      return;
    }

    setMenu(prev => [...prev, { ...plato, added: true }]);
    return "Success"; // Mensaje para agregar
  };

  const eliminarDelMenu = (id) => {
    setMenu(prevPlatos => prevPlatos.filter(plato => plato.id !== id));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={menu}
        renderItem={({ item }) => (
          <Plato 
            plato={item} 
            onToggleSelection={handleTogglePlato} 
            inMenu={true} 
            navigation={navigation}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button title="Ir a Buscador" onPress={() => navigation.navigate('Buscador', { handleTogglePlato })} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
});

export default Main;
