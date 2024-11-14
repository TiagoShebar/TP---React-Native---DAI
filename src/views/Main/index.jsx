import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Button, Alert, Text } from 'react-native';
import Plato from '../../components/Plato';
import { useMenu } from '../../MenuContext.js';

const Main = ({ navigation }) => {
  const { menu, setMenu, handleTogglePlato } = useMenu();
  const [promedioHealthScore, setPromedioHealthScore] = useState(0);
  const [precioTotal, setPrecioTotal] = useState(0);
  const [previousMenu, setPreviousMenu] = useState([]);

  useEffect(() => {
    setPromedioHealthScore(calcularPromedio());
    setPrecioTotal(calcularTotal());
  }, [menu]);

  const calcularPromedio = () => {
    if (menu.length === 0) return 0;
    const totalHealthScore = menu.reduce((sum, item) => sum + item.healthScore, 0);
    return totalHealthScore / menu.length;
  } 

  const calcularTotal = () => {
    const total = menu.reduce((sum, item) => {
      const precio = parseFloat(item.pricePerServing) || 0;
      return sum + precio;
    }, 0);
  
    return parseFloat(total.toFixed(2));
  }
  
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
      <Text>Promedio HealthScore: {promedioHealthScore}</Text>
      <Text>Precio total del menu: {precioTotal}</Text>
      <Button
        title="Ir a Buscador"
        onPress={() => navigation.navigate('Buscador')}
      />
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

