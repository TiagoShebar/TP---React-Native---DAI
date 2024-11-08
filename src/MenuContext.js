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
      return "success"
    } else {
      const response = await agregarAlMenu(plato);
      if(response){
        return "success";
      }
      else{
        return "bad";
      }
    }
  };

  const inMenu = (id) => {
    return menu.some(item => item.id === id);
  }

  const agregarAlMenu = async (plato) => {
    if (menu.length === 4) {
      alert("El menú está al máximo de platos (4)");
      return false;
    }

    const info = await getInfoById(plato.id);

    const veganoCount = menu.filter(p => p.vegan).length;
    const noVeganoCount = menu.filter(p => !p.vegan).length;

    if ((info.vegan && veganoCount >= 2) || (!info.vegan && noVeganoCount >= 2)) {
      alert("El menú puede tener como máximo dos veganos y dos no veganos.");
      return false;
    }

    if (info) {
      setMenu(prev => [...prev, { ...plato, ...info }]);
      return true;
    }else {
      setMenu(prev => [...prev, plato]);
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
