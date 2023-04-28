import studentsData from "../../../public/data.json";

export let studentsDB = JSON.parse(
  JSON.stringify(studentsData)
) as typeof studentsData;
