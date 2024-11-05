import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import Plato from '../../components/Plato';
import { getInfoById } from '../../utils/getInfoById';

const Main = ({ navigation }) => {
  const [menu, setMenu] = useState([]);
  const [prevMenu, setPrevMenu] = useState([]);

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

  useEffect(() => {
    const updateMenuAsync = async () => {
      // Verificamos que 'menu' no esté vacío
      if (!menu || menu.length === 0) return;

      // Usamos Promise.all para esperar a todas las promesas de la actualización del menú
      const updatedMenu = await Promise.all(menu.map(async (plato, index) => {
        // Verificar si el plato no está en prevMenu
        if (!prevMenu.some(prevPlato => prevPlato.id === plato.id)) {
          try {
            // Obtener la información del plato de forma asincrónica
            const data = await getInfoById(plato.id);
            // Retornar el plato actualizado
            return { ...plato, ...data };
          } catch (error) {
            console.error("Error fetching recipe:", error);
            return plato; // Si hay un error, devolvemos el plato sin modificar
          }
        }
        return plato; // Si el plato ya está en prevMenu, devolvemos el plato sin modificar
      }));

      // Actualizamos 'menu' después de que todas las promesas se resuelvan
      setMenu(updatedMenu);
    };

    updateMenuAsync();

    // Actualizamos 'prevMenu' después de que se actualice 'menu'
    setPrevMenu(menu);
  }, [menu]); // Dependemos de 'menu' y 'prevMenu' para que el useEffect se dispare

  // Establecemos 'prevMenu' cuando el componente se monta o se actualiza el menú
  useEffect(() => {
    setPrevMenu(menu);
  }, [menu, prevMenu]);

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
      <View></View>
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
