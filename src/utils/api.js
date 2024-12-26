// src/utils.js

export const fetchPokemon = async (query) => {
    // Validate query input: ensure it's not empty or too short
    if (!query || query.length < 2) {
      throw new Error('Please enter a valid Pokémon name or ID.');
    }
  
    const url = `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`;
    try {
      const response = await fetch(url);
  
      // Handle 404 error if Pokémon is not found
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Pokémon not found. Please check the name or ID.');
        }
        throw new Error('Something went wrong while fetching data.');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  