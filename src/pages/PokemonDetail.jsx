import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function PokemonDetails() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setPokemon(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [name]);

  if (loading) return <div>Loading...</div>;
  if (!pokemon) return <div>Pokemon not found!</div>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <div className="mb-4">
        <Link to="/" className="text-blue-500">
          &lt; Back
        </Link>
      </div>

      <div className="border rounded-lg shadow-lg overflow-hidden">
        <div className="w-full h-64 bg-green-500 bg-cover bg-center flex justify-center items-center">
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="h-40 w-40 object-contain"
          />
        </div>

        <div className="p-4 bg-orange-100">
          <h1 className="text-3xl font-bold capitalize mb-2 text-center">
            {pokemon.name}
          </h1>

          <p className="mb-2 text-center">
            <strong>Type:</strong>{' '}
            {pokemon.types.map((type) => type.type.name).join(', ')}
          </p>

          <div className="mb-4">
            <h3 className="font-semibold mb-1">Stats:</h3>
            <ul className="list-disc list-inside">
              {pokemon.stats.map((stat) => (
                <li key={stat.stat.name}>
                  {stat.stat.name}: {stat.base_stat}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold mb-1">Abilities:</h3>
            <ul className="list-disc list-inside">
              {pokemon.abilities.map((ability) => (
                <li key={ability.ability.name}>{ability.ability.name}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-1">Some Moves:</h3>
            <p>
              {pokemon.moves
                .slice(0, 6)
                .map((move) => move.move.name)
                .join(', ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
