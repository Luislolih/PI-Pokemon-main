const {
    crearPokemon,
    obtenerPokemones,
    obtenerPokemonPorId,
    buscarPokemonesPorNombre,
} = require("../controllers/pokemonControllers");

const crearPokemonHandler = async (req, res) => {
    try {
        const {
            name,
            image,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            type,
        } = req.body;
        const newPoke = await crearPokemon(
            name,
            image,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            type
        );
        res.status(201).json(newPoke);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const obtenerPokemonesHandler = async (req, res) => {
    try {
        const pokemones = await obtenerPokemones();
        res.status(200).json(pokemones);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const obtenerPokemonPorIdHandler = async (req, res) => {
    const id = req.params.id;

    try {
        const pokemon = await obtenerPokemonPorId(id);
        if (!pokemon) {
            res.status(404).json({ error: "Pokemon not found" });
        } else {
            res.json(pokemon);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const buscarPokemonesPorNombreHandler = async (req, res) => {
    try {
        const name = req.query.name;
        const pokemones = await buscarPokemonesPorNombre(name);
        res.json(pokemones);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    crearPokemonHandler,
    obtenerPokemonesHandler,
    obtenerPokemonPorIdHandler,
    buscarPokemonesPorNombreHandler,
};
