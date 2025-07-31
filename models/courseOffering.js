module.exports = (sequelize, DataTypes) => {
  const CourseOffering = sequelize.define('CourseOffering', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    courseName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    instructor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    semester: {
      type: DataTypes.STRING,
      allowNull: false
    },
    schedule: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'course_offerings',
    timestamps: true
  });

  return CourseOffering;
};