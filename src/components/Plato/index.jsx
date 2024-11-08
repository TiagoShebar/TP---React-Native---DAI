import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Button } from 'react-native';

const Plato = ({ plato, onToggleSelection, inMenu, navigation }) => {
  const [selected, setSelected] = useState(inMenu);

  useEffect(() => {
    setSelected(inMenu);
  }, [inMenu]);

  const toggleSelection = async () => {
    const response = await onToggleSelection(plato);
    if(response === "success"){
      setSelected(!selected);
    }
    
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => navigation.navigate('DetallePlato', { plato, onToggleSelection })}
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
