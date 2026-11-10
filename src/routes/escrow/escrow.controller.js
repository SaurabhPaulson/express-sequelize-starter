const { refundService } = require('../escrow/escrow.service.js')

const refundController = async (req, res, next) => {
    try {
        const idempotencyKey = req.get('idempotency-key');
        const escrowId = Number(req.params.id);
        const { amount } = req.body;

        if (!idempotencyKey || amount <= 0) {
            return res.status(400).json({ message: 'Invalid request. Please provide a valid idempotency key and amount greater than 0.' });
        }

        const result = await refundService(escrowId, amount, idempotencyKey);
        return res.status(200).json(result);

    } catch (error) {
        return next(error);
    }
}

module.exports = {
    refundController
}