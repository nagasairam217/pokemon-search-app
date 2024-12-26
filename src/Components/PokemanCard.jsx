import React from 'react';

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="border p-4 rounded">
      <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-24 h-24" />
      <h3 className="font-bold text-xl">{pokemon.name}</h3>
      <p>Type: {pokemon.types.map((type) => type.type.name).join(', ')}</p>
      <p>Height: {pokemon.height} decimetres</p>
      <p>Weight: {pokemon.weight} hectograms</p>
    </div>
  );
};

export default PokemonCard;
