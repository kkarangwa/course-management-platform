const { User, Module, Cohort, CourseOffering } = require('../models');

async function seedDatabase() {
  try {
    // Create sample users
    const manager = await User.create({
      firstName: 'Admin',
      lastName: 'Manager',
      email: 'manager@example.com',
      password: 'password123',
      role: 'manager'
    });

    const facilitator = await User.create({
      firstName: 'John',
      lastName: 'Facilitator',
      email: 'facilitator@example.com',
      password: 'password123',
      role: 'facilitator'
    });

    // Create sample modules
    const module1 = await Module.create({
      code: 'CS101',
      name: 'Introduction to Computer Science',
      description: 'Basic concepts of computer science',
      credits: 3
    });

    // Create sample cohort
    const cohort = await Cohort.create({
      name: 'Software Engineering',
      year: 2024,
      description: 'Software Engineering Cohort 2024'
    });

    // Create sample course offering
    await CourseOffering.create({
      moduleId: module1.id,
      facilitatorId: facilitator.id,
      cohortId: cohort.id,
      trimester: '1',
      intake: 'FT',
      mode: 'online',
      classCode: '2024S'
    });

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Seeding failed:', error);
  }
}

module.exports = { seedDatabase };