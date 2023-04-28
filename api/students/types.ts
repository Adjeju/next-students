export type Student = {
  id: string;
  name: string;
  course: string;
  module: string;
  lesson: string;
  progress: number;
};

export type GetStudentsResponse = {
  totalCount: number;
  students: Student[];
};
