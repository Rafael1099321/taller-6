const { ValidationError } = require('../utils/errors');

const required = (obj, fields) => {
  const missing = fields.filter((f) => obj[f] === undefined || obj[f] === null || obj[f] === '');
  if (missing.length) throw new ValidationError(`Campos obligatorios faltantes: ${missing.join(', ')}`);
};
const positiveNumber = (value, name, { integer = false, allowZero = false } = {}) => {
  const n = Number(value);
  const ok = Number.isFinite(n) && (allowZero ? n >= 0 : n > 0) && (!integer || Number.isInteger(n));
  if (!ok) throw new ValidationError(`${name} debe ser un numero ${integer ? 'entero ' : ''}${allowZero ? 'mayor o igual a 0' : 'mayor a 0'}`);
  return n;
};
const parseId = (raw) => {
  const id = Number(raw);
  if (!Number.isInteger(id) || id <= 0) throw new ValidationError('El id debe ser un entero positivo');
  return id;
};
const isoDate = (value, name) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(value)))
    throw new ValidationError(`${name} debe tener formato AAAA-MM-DD`);
};
module.exports = { required, positiveNumber, parseId, isoDate };
