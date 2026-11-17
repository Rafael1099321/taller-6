const { createStore } = require('./jsonStore');
const store = createStore('airplanes.json');
const ID = 'id';

module.exports = {
  findAll: () => store.findAll(),
  findById: (id) => store.findById(ID, id),
  create: (data) => store.create(ID, data),
  update: (id, data) => store.update(ID, id, data),
  remove: (id) => store.remove(ID, id),
  findByPlate: (matricula) => store.findBy('matricula', matricula),
};
