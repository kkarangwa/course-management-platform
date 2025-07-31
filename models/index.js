// models/courseOffering.js

module.exports = (sequelize, DataTypes) => {
  const CourseOffering = sequelize.define('CourseOffering', {
    // Define your model attributes here, example:
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // optionally add references if you want FK constraints:
      // references: { model: 'Courses', key: 'id' }
    },
    moduleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    facilitatorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    // Add any other fields you want
  }, {
    tableName: 'CourseOfferings',  // optional, by default Sequelize pluralizes model name
    timestamps: true,  // or false if you don't want createdAt, updatedAt
  });

  // Associations can also be added here if you want
  // e.g. CourseOffering.associate = function(models) { ... }

  return CourseOffering;
};