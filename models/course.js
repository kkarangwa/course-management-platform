'use strict';

module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});

  Course.associate = function(models) {
    // Define associations here, e.g.:
    // Course.hasMany(models.Module);
  };

  return Course;
};