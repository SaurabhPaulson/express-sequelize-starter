const  express = require('express');
const router = express.Router();

const { refundController } = require('../escrow/escrow.controller.js');

router.post('/:id/refund', refundController);

module.exports = router;