// models/courseOffering.js
'use strict';

module.exports = (sequelize, DataTypes) => {
  const CourseOffering = sequelize.define('CourseOffering', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    cohortId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    moduleId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    facilitatorId: {
      type: DataTypes.UUID,
      allowNull: false,
    }
  }, {
    tableName: 'course_offerings',
    timestamps: true,
  });

  return CourseOffering;
};