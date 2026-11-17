const service = require('../services/pilotService');
const { handle } = require('./handler');

module.exports = {
  getAll: handle(200, () => service.list()),
  getById: handle(200, (req) => service.getById(req.params.id)),
  create: handle(201, (req) => service.registerPilot(req.body)),
  update: handle(200, (req) => service.updatePilot(req.params.id, req.body)),
  remove: handle(204, (req) => service.deletePilot(req.params.id)),
};
