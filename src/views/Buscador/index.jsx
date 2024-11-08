import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, ActivityIndicator, StyleSheet } from 'react-native';
import Plato from "../../components/Plato"
import axios from 'axios';
//import { API_KEY, BASE_URL } from '@env';
import { API_KEY, BASE_URL } from '../../../code.js';
import { useMenu } from "../../MenuContext.js";

const Buscador = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { handleTogglePlato, inMenu } = useMenu();

  const searchRecipes = async () => {
    if (query.length < 2) return;

    setLoading(true);
    console.log(API_KEY)
    try {
      const urlFinal = `${BASE_URL}/complexSearch`;
      const response = await axios.get(urlFinal, {
        params: {
          apiKey: API_KEY,
          query: query,
          number: 10
        },
        
      });
      setRecipes(response.data.results);
    } catch (error) {
      console.error('Error fetching recipes:', error.message || JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchRecipes();
  }, [query]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar recetas..."
        value={query}
        onChangeText={setQuery}
      />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Plato 
            plato={item} 
            onToggleSelection={handleTogglePlato}
            inMenu={inMenu(item.id)}
            navigation={navigation}
          />
        )}
        ListEmptyComponent={() => !loading && <Text>No se encontraron recetas.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 20,
  },
});

export default Buscador;

