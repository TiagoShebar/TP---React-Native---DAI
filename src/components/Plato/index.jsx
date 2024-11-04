import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Plato = ({ nombre, imagen }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imagen }} style={styles.image} />
      <Text style={styles.name}>{nombre}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    borderColor: '#ddd',
    borderWidth: 1,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Plato;
