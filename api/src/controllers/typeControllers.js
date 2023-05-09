const axios = require('axios');
const { Type } = require('../db');

const obtenerTypes = async () => {
  let tipos = await Type.findAll();

  if (tipos.length === 0) {
    const response = await axios.get('https://pokeapi.co/api/v2/type');
    const tiposApi = response.data.results;

    tipos = await Promise.all(tiposApi.map(async (tipo) => {
      const response = await axios.get(tipo.url);
      const nombre = response.data.name;
      return { nombre };
    }));

    await Type.bulkCreate(tipos);
  }

  return tipos;
};

module.exports = {
  obtenerTypes,
};