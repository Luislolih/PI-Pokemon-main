const axios = require("axios");
const { Pokemon, Type } = require("../db");

const crearPokemon = async (
    name,
    image,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    type
) => {
    name = name.toLowerCase();

    const existingPokemonDB = await Pokemon.findOne({ where: { name } });
    if (existingPokemonDB) {
        throw new Error("The Pokemon already exists in the database");
    }

    try {
        const existingPokemonApi = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
        );
        console.log("existingPokemonApi: %o", existingPokemonApi.data);
        throw new Error("The Pokemon already exists in the API");
    } catch (error) {
        if (error.message === "The Pokemon already exists in the API") {
            throw error;
        } else if (error.response && error.response.status === 404) {
            console.log("The Pokemon does not exist in the API");
            const data = {
                name,
                image,
                hp,
                attack,
                defense,
                speed,
                height,
                weight,
                type,
            };
            const createPoke = await Pokemon.create(data);
            return createPoke;
        } else {
            console.error("Pokeapi API request failed:", error);
            throw new Error(
                "Failed to verify the existence of the Pokémon in the API"
            );
        }
    }
};

const obtenerNPokemones = async (nPokemones = 60) => {
    const pokemonesDb = await Pokemon.findAll();

    const pokemonData = (await axios("https://pokeapi.co/api/v2/pokemon")).data;
    let allPokemons = [];

    allPokemons = pokemonData.results;

    const cantidadData = pokemonData.results.length;

    const numeroDeLlamadas = nPokemones / cantidadData;
    let contador = 1;
    let nextUrl = pokemonData.next;
    while (contador < numeroDeLlamadas) {
        const pokemonNextData = (await axios(nextUrl)).data;
        nextUrl = pokemonNextData.next;
        contador += 1;
        console.log("%s pokemonData.next: %o", contador, pokemonData.next);
        const pokemonNextResult = pokemonNextData.results;
        allPokemons = [...allPokemons, ...pokemonNextResult];
    }

    return new Promise((resolve, reject) => {
        resolve(allPokemons);
    });
};

const obtenerPokemones = async () => {
    const pokemonesDb = await Pokemon.findAll();

    const pokemonList = await obtenerNPokemones();
    console.log("pokemonList:%o", pokemonList);
    const pokemonDetails = await Promise.all(
        pokemonList.map(async (pokemon) => {
            const details = (await axios(pokemon.url)).data;

            return {
                id: details.id,
                name: details.name,
                image: details.sprites.other["official-artwork"].front_default,
                hp: details.stats.find((stat) => stat.stat.name === "hp")
                    .base_stat,
                attack: details.stats.find(
                    (stat) => stat.stat.name === "attack"
                ).base_stat,
                defense: details.stats.find(
                    (stat) => stat.stat.name === "defense"
                ).base_stat,
                speed: details.stats.find((stat) => stat.stat.name === "speed")
                    .base_stat,
                height: details.height,
                weight: details.weight,
                type: details.types.map((type) => type.type.name),
            };
        })
    );

    const pokemones = [...pokemonDetails, ...pokemonesDb];
    return pokemones;
};

const buscarPokemonesPorNombre = async (name) => {
    const pokemonesBd = await Pokemon.findOne({
        where: { name: name.toLowerCase() },
    });

    if (pokemonesBd) {
        return pokemonesBd;
    } else {
        const response = await axios(
            `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
        );
        const pokemon = response.data;
        return {
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.sprites.other["official-artwork"].front_default,
            hp: pokemon.stats.find((stat) => stat.stat.name === "hp").base_stat,
            attack: pokemon.stats.find((stat) => stat.stat.name === "attack")
                .base_stat,
            defense: pokemon.stats.find((stat) => stat.stat.name === "defense")
                .base_stat,
            speed: pokemon.stats.find((stat) => stat.stat.name === "speed")
                .base_stat,
            height: pokemon.height,
            weight: pokemon.weight,
            type: pokemon.types.map((type) => type.type.name),
        };
    }
};

const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const numIdRegex = /[0-9]{1,5}/i;

const obtenerPokemonPorId = async (id) => {
    if (uuidRegex.test(id)) {
        const pokeBd = await Pokemon.findOne({ where: { id: id } });

        if (!pokeBd) {
            throw new Error("Pokemon not found");
        }
        return pokeBd;
    } else if (numIdRegex.test(id)) {
        const pokeOne = (await axios(`https://pokeapi.co/api/v2/pokemon/${id}`))
            .data;
        return {
            id: pokeOne.id,
            name: pokeOne.name,
            image: pokeOne.sprites.other["official-artwork"].front_default,
            hp: pokeOne.stats.find((stat) => stat.stat.name === "hp").base_stat,
            attack: pokeOne.stats.find((stat) => stat.stat.name === "attack")
                .base_stat,
            defense: pokeOne.stats.find((stat) => stat.stat.name === "defense")
                .base_stat,
            speed: pokeOne.stats.find((stat) => stat.stat.name === "speed")
                .base_stat,
            height: pokeOne.height,
            weight: pokeOne.weight,
            type: pokeOne.types.map((type) => type.type.name),
        };
    }
};

module.exports = {
    crearPokemon,
    obtenerPokemones,
    obtenerPokemonPorId,
    buscarPokemonesPorNombre,
};
