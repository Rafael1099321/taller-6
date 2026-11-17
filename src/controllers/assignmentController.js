const service = require('../services/assignmentService');
const { handle } = require('./handler');

module.exports = {
  getAll: handle(200, () => service.list()),
  getById: handle(200, (req) => service.getById(req.params.id)),
  create: handle(201, (req) => service.registerAssignment(req.body)),
  update: handle(200, (req) => service.updateAssignment(req.params.id, req.body)),
  remove: handle(204, (req) => service.deleteAssignment(req.params.id)),
};
