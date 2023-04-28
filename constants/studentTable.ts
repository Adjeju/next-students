export const STUDENTS_PAGE_DEFAULT_LIMIT = 10;
export const studentsTableBaseQuery = {
  page: 1,
  sort: "",
  direction: "ascending" as const,
  limit: STUDENTS_PAGE_DEFAULT_LIMIT,
};
