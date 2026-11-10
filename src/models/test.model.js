const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Test = sequelize.define(
  'Test',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'tests',
    timestamps: true,
  }
);

module.exports = Test;
