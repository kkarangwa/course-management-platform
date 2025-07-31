'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../config/database');

// Import models
const User = require('./user')(sequelize, Sequelize.DataTypes);
const Module = require('./module')(sequelize, Sequelize.DataTypes);
const Cohort = require('./cohort')(sequelize, Sequelize.DataTypes);
const Course = require('./course')(sequelize, Sequelize.DataTypes);  // formerly class.js
const CourseOffering = require('./courseOffering')(sequelize, Sequelize.DataTypes); // if you have this model

// Define associations
User.hasMany(CourseOffering, { as: 'facilitatorAllocations', foreignKey: 'facilitatorId' });
CourseOffering.belongsTo(User, { as: 'facilitator', foreignKey: 'facilitatorId' });

Module.hasMany(CourseOffering, { foreignKey: 'moduleId' });
CourseOffering.belongsTo(Module, { foreignKey: 'moduleId' });

// Other associations can go here...
// Course.belongsToMany(Cohort, { through: 'CohortCourses', ... });

const db = {
  sequelize,
  Sequelize,
  User,
  Module,
  Cohort,
  Course,
  CourseOffering,
  // Add any other models here
};

module.exports = db;