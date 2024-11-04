import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Button } from 'react-native';

const Plato = ({ plato, onToggleSelection, inMenu, navigation, handleTogglePlato }) => {
  const [selected, setSelected] = useState(inMenu);

  const toggleSelection = () => {
    const response = onToggleSelection(plato);
    if (response === "Success") {
      setSelected(!selected);
    } else {
      Alert.alert("Error", response); // Show error message
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => navigation.navigate('DetallePlato', { plato, handleTogglePlato })} // Navigate to DetallePlato
      >
        <Image source={{ uri: plato.image }} style={styles.image} />
        <Text style={styles.name}>{plato.title}</Text>
      </TouchableOpacity>
      <Button
        title={selected ? 'Eliminar' : 'Agregar'}
        onPress={toggleSelection}
        color={selected ? 'red' : 'green'}
      />
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
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Plato;
