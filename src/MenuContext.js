import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
//import { API_KEY, BASE_URL } from '@env';
import { API_KEY, BASE_URL } from '../code';

const MenuContext = createContext();

export const useMenu = () => {
  return useContext(MenuContext);
};

const getInfoById = async (id) => {
  try {
    const urlFinal = `${BASE_URL}/${id}/information`;
    const response = await axios.get(urlFinal, {
      params: {
        includeNutrition: true,
        apiKey: API_KEY
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching info:', error);
    return null;
  }
};

export const MenuProvider = ({ children }) => {
  const [menu, setMenu] = useState([]);

  const handleTogglePlato = async (plato) => {
    if (menu.some(item => item.id === plato.id)) {
      eliminarDelMenu(plato.id);
    } else {
      await agregarAlMenu(plato);
    }
  };

  const inMenu = (id) => {
    return menu.some(item => item.id === id);
  }

  const agregarAlMenu = async (plato) => {
    if (menu.length === 4) {
      alert("El menú está al máximo de platos (4)");
      return;
    }

    const veganoCount = menu.filter(p => p.vegan).length;
    const noVeganoCount = menu.filter(p => !p.vegan).length;

    if ((plato.vegan && veganoCount >= 2) || (!plato.vegan && noVeganoCount >= 2)) {
      alert("El menú puede tener como máximo dos veganos y dos no veganos.");
      return;
    }

    const info = await getInfoById(plato.id);
    if (info) {
      setMenu(prev => [...prev, { ...plato, ...info }]);
    }
  };

  const eliminarDelMenu = (id) => {
    setMenu(prevPlatos => prevPlatos.filter(plato => plato.id !== id));
  };

  return (
    <MenuContext.Provider value={{ menu, setMenu, handleTogglePlato, getInfoById, inMenu }}>
      {children}
    </MenuContext.Provider>
  );
};
