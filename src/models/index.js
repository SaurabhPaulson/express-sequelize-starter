const sequelize = require('../config/database');
const Account = require('./accounts');
const Escrow = require('./Escrow');
const RefundTransaction = require('./RefundTransactions');

Escrow.belongsTo(Account, { as: 'buyerAccount', foreignKey: 'buyer_account_id' });
Escrow.belongsTo(Account, { as: 'providerAccount', foreignKey: 'provider_account_id' });
Escrow.belongsTo(Account, { as: 'escrowAccount', foreignKey: 'escrow_account_id' });

RefundTransaction.belongsTo(Escrow, { as: 'escrow', foreignKey: 'escrow_id' });


module.exports = {
    sequelize,
    Account,
    Escrow,
    RefundTransaction
}




