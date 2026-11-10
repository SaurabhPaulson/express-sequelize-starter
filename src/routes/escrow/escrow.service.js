const { sequelize, Account, Escrow, RefundTransaction } = require('../../models');

const refundService = async (escrowId, amount, idempotencyKey) => {
    return sequelize.transaction(async (t) => {
        const alreadyExisting = await RefundTransaction.findOne({
            where: {
                idempotency_key: idempotencyKey
            }
        });

        if (alreadyExisting) {
            if (alreadyExisting.escrowId !== escrowId || alreadyExisting.amount !== amount) {
                throw { status: 409, message: 'escrowId, amount, idempotencyKey.' };
            }
            return alreadyExisting.response_payload
        }

        const escrow = await Escrow.findByPk(escrowId, { lock: true, transaction: t });
        if (!escrow) {
            throw { status: 404, message: 'Escrow not found.' };
        }

        const remainingAmount = escrow.amount - escrow.refunded_amount;
        if (amount > remainingAmount) {
            throw { status: 409, message: 'Insufficient refundable balance.' };
        }

        await Account.decrement('balance', { by: amount, where: { id: escrow.escrow_account_id }, transaction: t });
        await Account.increment('balance', { by: amount, where: { id: escrow.buyer_account_id }, transaction: t });

        escrow.refunded_amount += amount;
        escrow.status = escrow.refunded_amount === escrow.amount ? 'REFUNDED' : 'PARTIALLY_REFUNDED';
        await escrow.save({ transaction: t });

        const responsePayload = {
            "escrowId": escrow.id,
            "refundedAmount": amount,
            "remainingAmount": escrow.amount - escrow.refunded_amount,
            "status": escrow.status
        }

        await RefundTransaction.create({
            escrow_id: escrow.id,
            amount: amount,
            idempotency_key: idempotencyKey
        }, { transaction: t });
        return responsePayload;
    });
};

module.exports = {
    refundService
}