import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const getPokemonList = async ({pageParam = 0}) => {
  const response = await axios.get(
    `${BASE_URL}/pokemon?limit=10&offset=${pageParam * 10}`,
  );

  const pokemonDetails = await Promise.all(
    response.data.results.map(async pokemon => {
      const detailResponse = await axios.get(pokemon.url);
      return {
        id: detailResponse.data.id,
        name: detailResponse.data.name,
        image: detailResponse.data.sprites.front_default,
        types: detailResponse.data.types.map(type => type.type.name),
      };
    }),
  );

  return {
    pokemon: pokemonDetails,
    nextPage: pageParam + 1,
    hasMore: !!response.data.next,
  };
};

export const getPokemonById = async id => {
  const response = await axios.get(`${BASE_URL}/pokemon/${id}`);
  return {
    id: response.data.id,
    name: response.data.name,
    image: response.data.sprites.front_default,
    types: response.data.types.map(type => type.type.name),
    stats: response.data.stats,
    height: response.data.height,
    weight: response.data.weight,
  };
};
