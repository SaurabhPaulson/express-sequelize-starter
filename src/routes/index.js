const express = require('express');
const healthRoutes = require('./health.routes');
const escrowRoutes = require('./escrow/escrow.routes');

const router = express.Router();

router.use('/health', healthRoutes);
router.use('/escrow', escrowRoutes);

module.exports = router;