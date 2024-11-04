import React from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView, Alert } from 'react-native';

const DetallePlato = ({ nombre, imagen, descripcion, healthScore, esVegano, enMenu, agregarAlMenu }) => {
  const handleAgregarAlMenu = () => {
    
    if (agregarAlMenu) {
      agregarAlMenu();
    } else {
      Alert.alert("Error", "No se pudo agregar el plato al menú.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: imagen }} style={styles.image} />
      
      <Text style={styles.name}>{nombre}</Text>

      {esVegano && <Text style={styles.vegano}>Este plato es vegano</Text>}
      
      <Text style={styles.healthScore}>Puntuación de salud: {healthScore}</Text>

      <Text style={styles.description}>{descripcion}</Text>
      
      {enMenu ? (
        <Text style={styles.enMenu}>¡Este plato está en el menú!</Text>
      ) : (
        <Button
          title="Agregar al Menú"
          onPress={handleAgregarAlMenu}
          color="#3498db"
        />
      )}
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
  description: {
    fontSize: 16,
    color: '#7f8c8d',
    lineHeight: 24,
    marginBottom: 20,
  },
  enMenu: {
    fontSize: 16,
    color: '#3498db',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default DetallePlato;
