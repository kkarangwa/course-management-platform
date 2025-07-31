'use strict';

module.exports = (sequelize, DataTypes) => {
  const Facilitator = sequelize.define('Facilitator', {
    // define your columns, e.g.:
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }
  }, {});

  Facilitator.associate = function(models) {
    // define associations here, e.g.:
    // Facilitator.hasMany(models.CourseOffering, { foreignKey: 'facilitatorId' });
  };

  return Facilitator;
};