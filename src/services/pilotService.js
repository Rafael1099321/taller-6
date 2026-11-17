const pilotModel = require('../models/pilotModel');
const assignmentModel = require('../models/assignmentModel');
const { NotFoundError, ConflictError, ValidationError } = require('../utils/errors');
const { required, positiveNumber, parseId } = require('./validators');

const ESTADOS = ['activo', 'inactivo', 'suspendido'];

const clean = (d) => ({
  nombre: String(d.nombre).trim(),
  licencia: String(d.licencia).trim(),
  horasVuelo: positiveNumber(d.horasVuelo, 'horasVuelo', { allowZero: true }),
  estado: String(d.estado).toLowerCase(),
});
const checkEstado = (p) => {
  if (!ESTADOS.includes(p.estado)) throw new ValidationError(`estado debe ser uno de: ${ESTADOS.join(', ')}`);
};

const list = () => pilotModel.findAll();

const getById = async (rawId) => {
  const pilot = await pilotModel.findById(parseId(rawId));
  if (!pilot) throw new NotFoundError('Piloto no encontrado');
  return pilot;
};

const registerPilot = async (data) => {
  required(data, ['nombre', 'licencia', 'horasVuelo', 'estado']);
  const pilot = clean(data);
  checkEstado(pilot);
  if (await pilotModel.findByLicense(pilot.licencia)) throw new ConflictError('Ya existe un piloto con esa licencia');
  return pilotModel.create(pilot);
};

const updatePilot = async (rawId, data) => {
  const id = parseId(rawId);
  const current = await getById(id);
  const merged = clean({ ...current, ...data });
  checkEstado(merged);
  const dup = await pilotModel.findByLicense(merged.licencia);
  if (dup && dup.id !== id) throw new ConflictError('Ya existe otro piloto con esa licencia');
  return pilotModel.update(id, merged);
};

const deletePilot = async (rawId) => {
  const id = parseId(rawId);
  await getById(id);
  const asignaciones = await assignmentModel.findByPilot(id);
  if (asignaciones.length) throw new ConflictError('No se puede eliminar: el piloto tiene asignaciones registradas');
  await pilotModel.remove(id);
};

module.exports = { list, getById, registerPilot, updatePilot, deletePilot };
