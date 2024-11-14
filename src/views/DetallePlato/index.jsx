import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView } from 'react-native';
import { useMenu } from '../../MenuContext';

const DetallePlato = ({ route, navigation }) => {
  let { plato } = route.params;
  const { id, title, image } = plato;
  const { handleTogglePlato, getInfoById, inMenu } = useMenu();
  const [selected, setSelected] = useState(false);
  const [plato2, setPlato2] = useState(plato);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const platoInfo = await getInfoById(id);
        setPlato2(platoInfo);
      } catch (error) {
        console.error("Error al obtener la información del plato:", error);
      }
    };

    fetchInfo();

    setSelected(inMenu(id));  
  }, [id])

  const handlePress = () => {
    const response = handleTogglePlato(plato2);
    if(response === "success"){
      setSelected(!selected);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.name}>{title}</Text>
      <Text>Es vegano: {plato2.vegan ? "Sí" : "No"}</Text>
      <Text>Healthscore: {plato2.healthScore}</Text>
      <Button title={selected ? 'Eliminar del menu' : 'Agregar al menu'} onPress={handlePress} color={selected ? 'red' : 'green'} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default DetallePlato;

