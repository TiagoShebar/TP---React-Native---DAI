import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, ActivityIndicator, StyleSheet } from 'react-native';
import Plato from '../../components/Plato';
import axios from 'axios';

const API_KEY = '3575338cab9b49f4a034d52aa4776226';
const BASE_URL = 'https://api.spoonacular.com/recipes/complexSearch';



const Buscador = () => {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
  
    const searchRecipes = async (query) => {
      setLoading(true);
      try {
        const response = await axios.get(BASE_URL, {
          params: {
            apiKey: API_KEY,
            query: query,
          },
        });
  
        setRecipes(response.data.results);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      if (query.length >= 2) {
        searchRecipes(query);
      } else {
        setRecipes([]); 
      }
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
            <Plato nombre={item.title} imagen={item.image} />
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
    recipeItem: {
      padding: 10,
      fontSize: 18,
    },
  });
  
  export default Buscador;