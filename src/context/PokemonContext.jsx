import React, { createContext, useState, useContext } from 'react';
// src/context/PokemonContext.jsx
import {fetchPokemon}  from '../utils/api'; 




const PokemonContext = createContext();

export const usePokemonContext = () => useContext(PokemonContext);

export const PokemonProvider = ({ children }) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPokemonData = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPokemon(query);
      setPokemon(data);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <PokemonContext.Provider value={{ pokemon, loading, error, fetchPokemonData }}>
      {children}
    </PokemonContext.Provider>
  );
};
