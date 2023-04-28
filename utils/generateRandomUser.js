const { faker } = require("@faker-js/faker");
var fs = require("fs");

const generateRandomUser = () => ({
  id: faker.datatype.uuid(),
  name: faker.name.fullName(),
  course: faker.helpers.arrayElement([
    "Math",
    "English",
    "Technology",
    "Science",
    "History",
  ]),
  module: faker.helpers.arrayElement([
    "Division",
    "Time",
    "Geometry",
    "Area",
    "Volume",
  ]),
  lesson: faker.helpers.arrayElement([
    "Lesson 1",
    "Lesson 2",
    "Lesson 3",
    "Lesson 4",
    "Lesson 5",
  ]),
  progress: faker.datatype.number({
    min: 0,
    max: 100,
  }),
});

const students = JSON.stringify(
  Array.from({ length: process.argv[2] }).map((_) => generateRandomUser())
);

fs.writeFile("data.json", students, "utf8", (err) => {
  console.log(err);
});
