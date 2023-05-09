const { obtenerTypes } = require('../controllers/typeControllers');

const obtenerTypesHandler = async (req, res)=>{
    try {
        const types = await obtenerTypes();
        res.json(types);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

module.exports = {
    obtenerTypesHandler
}