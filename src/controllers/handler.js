// Traduce errores de los servicios a codigos HTTP. Evita repetir try/catch en cada metodo.
const handle = (successStatus, fn) => async (req, res) => {
  try {
    const result = await fn(req);
    if (successStatus === 204) return res.status(204).send();
    return res.status(successStatus).json(result);
  } catch (error) {
    const status = error.status || 500;
    const message = error.status ? error.message : 'Error interno del servidor';
    if (!error.status) console.error(error);
    return res.status(status).json({ error: message });
  }
};
module.exports = { handle };
