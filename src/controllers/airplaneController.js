const service = require('../services/airplaneService');
const { handle } = require('./handler');

module.exports = {
  getAll: handle(200, () => service.list()),
  getById: handle(200, (req) => service.getById(req.params.id)),
  create: handle(201, (req) => service.registerAirplane(req.body)),
  update: handle(200, (req) => service.updateAirplane(req.params.id, req.body)),
  remove: handle(204, (req) => service.deleteAirplane(req.params.id)),
};
