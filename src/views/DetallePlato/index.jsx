import React from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView } from 'react-native';

const DetallePlato = ({ route, navigation }) => {
  const { plato, handleTogglePlato } = route.params; // Obteniendo los parámetros pasados
  console.log(plato)
  const { id, title, image, healthScore, vegan } = plato;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.name}>{title}</Text>
      {vegan && <Text style={styles.vegano}>Este plato es vegano</Text>}
      <Text style={styles.healthScore}>Puntuación de salud: {healthScore}</Text>
      <Button title="Agregar al Menú" onPress={() => handleTogglePlato(plato)} color="#3498db" />
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
  vegano: {
    fontSize: 16,
    color: '#2ecc71',
    textAlign: 'center',
    marginBottom: 10,
  },
  healthScore: {
    fontSize: 16,
    color: '#e67e22',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default DetallePlato;
