import { SortDirection } from "@react-types/shared";

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

export type GetStudentsParams = {
  limit: number;
  page: number;
  sort: string;
  direction: SortDirection;
};
