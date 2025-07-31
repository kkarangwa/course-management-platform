const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

// Create Sequelize instance
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database.sqlite'),
  logging: false, // Set to console.log to see SQL queries
});

// Import models
const User = require('./user')(sequelize, DataTypes);
const CourseOffering = require('./courseOffering')(sequelize, DataTypes);

// Define associations here if needed
// User.hasMany(CourseOffering);
// CourseOffering.belongsTo(User);

// Export everything
module.exports = {
  sequelize,
  Sequelize,
  User,
  CourseOffering
};