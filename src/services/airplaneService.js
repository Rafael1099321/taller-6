const airplaneModel = require('../models/airplaneModel');
const assignmentModel = require('../models/assignmentModel');
const { NotFoundError, ConflictError } = require('../utils/errors');
const { required, positiveNumber, parseId } = require('./validators');

const clean = (d) => ({
  modelo: String(d.modelo).trim(),
  matricula: String(d.matricula).trim().toUpperCase(),
  capacidadMaxima: positiveNumber(d.capacidadMaxima, 'capacidadMaxima', { integer: true }),
  fabricante: String(d.fabricante).trim(),
});

const list = () => airplaneModel.findAll();

const getById = async (rawId) => {
  const plane = await airplaneModel.findById(parseId(rawId));
  if (!plane) throw new NotFoundError('Avion no encontrado');
  return plane;
};

const registerAirplane = async (data) => {
  required(data, ['modelo', 'matricula', 'capacidadMaxima', 'fabricante']);
  const plane = clean(data);
  if (await airplaneModel.findByPlate(plane.matricula)) throw new ConflictError('Ya existe un avion con esa matricula');
  return airplaneModel.create(plane);
};

const updateAirplane = async (rawId, data) => {
  const id = parseId(rawId);
  const current = await getById(id);
  const merged = clean({ ...current, ...data });
  const dup = await airplaneModel.findByPlate(merged.matricula);
  if (dup && dup.id !== id) throw new ConflictError('Ya existe otro avion con esa matricula');
  return airplaneModel.update(id, merged);
};

const deleteAirplane = async (rawId) => {
  const id = parseId(rawId);
  await getById(id);
  if ((await assignmentModel.findByAirplane(id)).length)
    throw new ConflictError('No se puede eliminar: el avion tiene asignaciones registradas');
  await airplaneModel.remove(id);
};

module.exports = { list, getById, registerAirplane, updateAirplane, deleteAirplane };
