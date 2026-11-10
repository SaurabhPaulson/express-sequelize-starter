const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const RefundTransaction = sequelize.define('RefundTransaction', {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    escrow_id : {
        type : DataTypes.INTEGER,
        allowNull: false
    },
    amount : {
        type : DataTypes.INTEGER,
        allowNull: false
    },
    idempotency_key : {
        type : DataTypes.STRING,
        allowNull: false
    },
    created_at : {
        type : DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }

}, {
    tableName: 'refund_transactions',
    timestamps: false
})

module.exports = RefundTransaction;