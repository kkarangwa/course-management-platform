'use strict';

module.exports = (sequelize, DataTypes) => {
  const Cohort = sequelize.define('Cohort', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});

  Cohort.associate = function(models) {
    Cohort.hasMany(models.CourseOffering, { foreignKey: 'cohortId' });
  };

  return Cohort;
};