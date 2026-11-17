const express = require('express');
const routes = require('./routes');

const app = express();
app.use(express.json());
app.use('/api', routes);
app.use((req, res) => res.status(404).json({ error: 'Ruta no encontrada' }));
// JSON mal formado u otros errores de middleware
app.use((err, req, res, next) => res.status(err.status || 400).json({ error: 'Peticion invalida: ' + err.message }));

const PORT = process.env.PORT || 3000;
if (require.main === module) app.listen(PORT, () => console.log(`API aerolinea en http://localhost:${PORT}/api`));
module.exports = app;
