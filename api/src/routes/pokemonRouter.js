const { Router } = require('express');
const pokemonRouter = Router();
const { crearPokemonHandler, obtenerPokemonesHandler, obtenerPokemonPorIdHandler, buscarPokemonesPorNombreHandler } = require('../handlers/pokemonHandlers');



pokemonRouter.post('/', crearPokemonHandler);
pokemonRouter.get('/', obtenerPokemonesHandler);
pokemonRouter.get('/name', buscarPokemonesPorNombreHandler);
pokemonRouter.get('/:id', obtenerPokemonPorIdHandler);


module.exports = {
  pokemonRouter
}