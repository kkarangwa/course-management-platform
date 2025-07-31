const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Module = sequelize.define('Module', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { len: [3, 10] }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [5, 100] }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    credits: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 10 }
    }
  });

  return Module;
};