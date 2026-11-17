const assignmentModel = require('../models/assignmentModel');
const pilotModel = require('../models/pilotModel');
const airplaneModel = require('../models/airplaneModel');
const { NotFoundError, ConflictError, ValidationError } = require('../utils/errors');
const { required, parseId, isoDate } = require('./validators');

// Validacion relacional: consulta a los MODELOS de piloto y avion (nunca a fs).
const validateRelations = async (assignment, ignoreId = null) => {
  const pilot = await pilotModel.findById(assignment.idPiloto);
  if (!pilot) throw new ValidationError(`El piloto con id ${assignment.idPiloto} no existe`);
  if (pilot.estado !== 'activo') throw new ConflictError(`El piloto ${pilot.nombre} no esta activo (estado: ${pilot.estado})`);

  const plane = await airplaneModel.findById(assignment.idAvion);
  if (!plane) throw new ValidationError(`El avion con id ${assignment.idAvion} no existe`);

  const sameDay = await assignmentModel.findConflict(assignment.idPiloto, assignment.fechaVuelo);
  if (sameDay.some((a) => a.idAsignacion !== ignoreId))
    throw new ConflictError('El piloto ya tiene una asignacion en esa fecha');
};

const clean = (d) => {
  const a = {
    idPiloto: Number(d.idPiloto),
    idAvion: Number(d.idAvion),
    fechaVuelo: String(d.fechaVuelo).trim(),
    rutaAsignada: String(d.rutaAsignada).trim(),
  };
  if (!Number.isInteger(a.idPiloto) || !Number.isInteger(a.idAvion))
    throw new ValidationError('idPiloto e idAvion deben ser enteros');
  isoDate(a.fechaVuelo, 'fechaVuelo');
  return a;
};

const list = () => assignmentModel.findAll();

const getById = async (rawId) => {
  const a = await assignmentModel.findById(parseId(rawId));
  if (!a) throw new NotFoundError('Asignacion no encontrada');
  return a;
};

const registerAssignment = async (data) => {
  required(data, ['idPiloto', 'idAvion', 'fechaVuelo', 'rutaAsignada']);
  const a = clean(data);
  await validateRelations(a);
  return assignmentModel.create(a);
};

const updateAssignment = async (rawId, data) => {
  const id = parseId(rawId);
  const current = await getById(id);
  const merged = clean({ ...current, ...data });
  await validateRelations(merged, id);
  return assignmentModel.update(id, merged);
};

const deleteAssignment = async (rawId) => {
  const id = parseId(rawId);
  await getById(id);
  await assignmentModel.remove(id);
};

module.exports = { list, getById, registerAssignment, updateAssignment, deleteAssignment };
