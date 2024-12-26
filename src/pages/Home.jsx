import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=100')
      .then(async (response) => {
        const basicPokemonList = response.data.results;

        const detailedPokemonList = await Promise.all(
          basicPokemonList.map(async (pokemon) => {
            const details = await axios.get(pokemon.url);
            return {
              name: pokemon.name,
              image: details.data.sprites.front_default,
            };
          })
        );

        setPokemonList(detailedPokemonList);
        setFilteredPokemon(detailedPokemonList);
      });

    axios.get('https://pokeapi.co/api/v2/type').then((response) => {
      setTypes(response.data.results);
    });
  }, []);

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setSelectedType(type);
    filterPokemon(searchTerm, type);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    filterPokemon(searchTerm, selectedType);
  };

  const filterPokemon = (term, type) => {
    let filtered = pokemonList;

    if (type) {
      axios.get(`https://pokeapi.co/api/v2/type/${type}`).then((response) => {
        const typePokemon = response.data.pokemon.map((p) => p.pokemon.name);
        filtered = filtered.filter((pokemon) =>
          typePokemon.includes(pokemon.name)
        );
        setFilteredPokemon(
          filtered.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(term.toLowerCase())
          )
        );
      });
    } else {
      setFilteredPokemon(
        filtered.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(term.toLowerCase())
        )
      );
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pokémon Search App</h1>
      <div className="flex gap-4 mb-4">
        <select
          className="border p-2 rounded"
          value={selectedType}
          onChange={handleTypeChange}
        >
          <option value="">Select</option>
          {types.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search Pokémon"
          className="border p-2 rounded flex-1"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button
          onClick={handleSearchClick}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPokemon.map((pokemon) => (
          <div
            key={pokemon.name}
            className="border p-4 rounded shadow hover:bg-gray-100 cursor-pointer"
          >
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="mb-2 w-full h-32 object-contain"
            />
            <h2 className="capitalize font-semibold text-center">
              {pokemon.name}
            </h2>
            <div className="text-center mt-2">
              <Link
                to={`/pokemon/${pokemon.name}`}
                className="text-blue-500 underline"
              >
                <button>Details ...</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
