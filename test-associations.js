// example: fetching CourseOffering with associations

const { CourseOffering, Module, Class, Cohort, Facilitator } = require('./models');

async function test() {
  const result = await CourseOffering.findAll({
    include: [Module, Class, Cohort, Facilitator]
  });
  console.log(JSON.stringify(result, null, 2));  // Add this line to print output
}

test();