const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Account = sequelize.define('Account', {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: DataTypes.ENUM("BUYER", "PROVIDER", "ESCROW"),
        allowNull: false
    },
    balance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        },
    },
}, { 
    tableName: 'accounts',
    timestamps: false
});

module.exports = Account;