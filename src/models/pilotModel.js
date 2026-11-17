const { createStore } = require('./jsonStore');
const store = createStore('pilots.json');
const ID = 'id';

module.exports = {
  findAll: () => store.findAll(),
  findById: (id) => store.findById(ID, id),
  create: (data) => store.create(ID, data),
  update: (id, data) => store.update(ID, id, data),
  remove: (id) => store.remove(ID, id),
  findByLicense: (licencia) => store.findBy('licencia', licencia),
};
