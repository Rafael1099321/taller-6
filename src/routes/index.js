const router = require('express').Router();
router.use('/pilotos', require('./pilotRoutes'));
router.use('/aviones', require('./airplaneRoutes'));
router.use('/asignaciones', require('./assignmentRoutes'));
module.exports = router;
