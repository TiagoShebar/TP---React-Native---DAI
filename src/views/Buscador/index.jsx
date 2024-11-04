import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

const API_KEY = '3575338cab9b49f4a034d52aa4776226';
const BASE_URL = 'https://api.spoonacular.com/recipes/complexSearch';



const Buscador = () => {
    const [query, setQuery] = useState(''); // Estado para la búsqueda
    const [recipes, setRecipes] = useState([]); // Estado para almacenar las recetas
    const [loading, setLoading] = useState(false); // Estado para manejar la carga
  
    const searchRecipes = async (query) => {
      setLoading(true); // Activar el estado de carga
      try {
        const response = await axios.get(BASE_URL, {
          params: {
            apiKey: API_KEY,
            query: query, // La consulta que deseas buscar
          },
        });
  
        // Actualiza el estado con los resultados de la búsqueda
        setRecipes(response.data.results);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false); // Desactivar el estado de carga
      }
    };
  
    // Efecto para buscar recetas cuando la consulta cambia
    useEffect(() => {
      if (query.length >= 2) {
        searchRecipes(query);
      } else {
        setRecipes([]); // Limpiar resultados si la consulta tiene menos de 2 caracteres
      }
    }, [query]);
  
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Buscar recetas..."
          value={query}
          onChangeText={setQuery} // Actualiza el estado de query
        />
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text style={styles.recipeItem}>{item.title}</Text>
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