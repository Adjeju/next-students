import { GetStudentsResponse } from "./types";

export const allStudentsKeys = ["students"];

export const getStudentsListKeys = ({
  page,
  sort,
  direction,
  limit,
}: {
  page: number;
  sort: string;
  direction: string;
  limit: number;
}) => {
  return [...allStudentsKeys, { page, sort, direction, limit }];
};

const getPageUrl = () =>
  typeof window === "undefined" ? process.env.VERCEL_URL : "";

export const getStudents = async ({
  page,
  limit,
  sort,
  direction,
}: {
  page: number;
  limit: number;
  sort?: string;
  direction?: string;
}) => {
  const resp = await fetch(
    `${getPageUrl()}/api/students?limit=${limit}&page=${page}&sort=${
      sort ?? ""
    }&direction=${direction ?? ""}`
  );

  return resp.json() as Promise<GetStudentsResponse>;
};

export const editStudent = async ({
  id,
  progress,
}: {
  id: string;
  progress: number;
}) => {
  const resp = await fetch(`${getPageUrl()}/api/students/edit`, {
    method: "PUT",
    body: JSON.stringify({ progress, id }),
  });

  return resp.json();
};
