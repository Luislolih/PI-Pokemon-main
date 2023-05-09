const { Router } = require('express');
const typeRouter = Router();
const { obtenerTypesHandler } = require('../handlers/typeHandlers');


typeRouter.get('/', obtenerTypesHandler);

module.exports = {
  typeRouter,
}