const { createStore } = require('./jsonStore');
const store = createStore('assignments.json');
const ID = 'idAsignacion';

module.exports = {
  findAll: () => store.findAll(),
  findById: (id) => store.findById(ID, id),
  create: (data) => store.create(ID, data),
  update: (id, data) => store.update(ID, id, data),
  remove: (id) => store.remove(ID, id),
  findByPilot: (idPiloto) => store.filter((a) => a.idPiloto === idPiloto),
  findByAirplane: (idAvion) => store.filter((a) => a.idAvion === idAvion),
  findConflict: (idPiloto, fechaVuelo) => store.filter((a) => a.idPiloto === idPiloto && a.fechaVuelo === fechaVuelo),
};
