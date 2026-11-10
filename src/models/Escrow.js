const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Escrow = sequelize.define('Escrow', {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    buyer_account_id : {
        type : DataTypes.INTEGER,
        allowNull: false
    },
    provider_account_id : {
        type : DataTypes.INTEGER,
        allowNull: false
    },
    escrow_account_id : {
        type : DataTypes.INTEGER,
        allowNull: false
    },
    amount : {
        type : DataTypes.INTEGER,
        allowNull: false
    },
    refunded_amount : {
        type : DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    status : {
        type : DataTypes.ENUM("HELD", "PARTIALLY_REFUNDED", "REFUNDED"),
        allowNull: false,
        defaultValue: "HELD"
    }
}, {
    tableName: 'escrows',
    timestamps: false
});

module.exports = Escrow;