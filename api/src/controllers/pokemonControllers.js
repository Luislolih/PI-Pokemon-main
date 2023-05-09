const axios = require('axios');
const { Pokemon, Type } = require('../db');

const crearPokemon = async (name, image, hp, attack, defense, speed, height, weight, type)=>{
  console.log(type);
  console.log(typeof type);
  const data = {name, image, hp, attack, defense, speed, height, weight, type};
  const createPoke = await Pokemon.create(data);
  return createPoke;
}

const obtenerPokemones = async ()=>{
  
  const pokemonesDb = await Pokemon.findAll();

  const pokemonList = (await axios("https://pokeapi.co/api/v2/pokemon")).data.results;

  const pokemonDetails = await Promise.all(
    pokemonList.map(async (pokemon) => {
      const details = (await axios(pokemon.url)).data;

      return {
        id: details.id,
        name: details.name,
        image: details.sprites.other['official-artwork'].front_default,
        hp: details.stats.find(stat => stat.stat.name === 'hp').base_stat,
        attack: details.stats.find(stat => stat.stat.name === 'attack').base_stat,
        defense: details.stats.find(stat => stat.stat.name === 'defense').base_stat,
        speed: details.stats.find(stat => stat.stat.name === 'speed').base_stat,
        height: details.height,
        weight: details.weight,
        type: details.types.map(type => type.type.name),
      };
    })
  );

  const pokemones = [...pokemonDetails, ...pokemonesDb];
  return pokemones;
}



const buscarPokemonesPorNombre = async (name) => {

  const pokemonesBd = await Pokemon.findOne({ where: { name: name.toLowerCase() } });

if(pokemonesBd){
  return pokemonesBd;
}else{
  const response = await axios(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
  const pokemon = response.data;
  return {
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.sprites.other['official-artwork'].front_default,
    hp: pokemon.stats.find(stat => stat.stat.name === 'hp').base_stat,
    attack: pokemon.stats.find(stat => stat.stat.name === 'attack').base_stat,
    defense: pokemon.stats.find(stat => stat.stat.name === 'defense').base_stat,
    speed: pokemon.stats.find(stat => stat.stat.name === 'speed').base_stat,
    height: pokemon.height,
    weight: pokemon.weight,
    type: pokemon.types.map(type => type.type.name),
  };
}
};


const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const numIdRegex = /[0-9]{1,5}/i;

const obtenerPokemonPorId = async (id)=>{
 

 if(uuidRegex.test(id)){

    const pokeBd = await Pokemon.findOne({ where: { id: id } });
  
    
    if (!pokeBd) {
      throw new Error('No se encontró el Pokemon');
    }
    return pokeBd;
  
  }else if(numIdRegex.test(id)){
    const pokeOne = (await axios(`https://pokeapi.co/api/v2/pokemon/${id}`)).data;
    return {
      id: pokeOne.id,
      name: pokeOne.name,
      image: pokeOne.sprites.other['official-artwork'].front_default,
      hp: pokeOne.stats.find(stat => stat.stat.name === 'hp').base_stat,
      attack: pokeOne.stats.find(stat => stat.stat.name === 'attack').base_stat,
      defense: pokeOne.stats.find(stat => stat.stat.name === 'defense').base_stat,
      speed: pokeOne.stats.find(stat => stat.stat.name === 'speed').base_stat,
      height: pokeOne.height,
      weight: pokeOne.weight,
      type: pokeOne.types.map(type => type.type.name),
    };
  }
}



module.exports = {
  crearPokemon,
  obtenerPokemones,
  obtenerPokemonPorId,
  buscarPokemonesPorNombre
}