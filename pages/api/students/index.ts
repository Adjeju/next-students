import type { NextApiRequest, NextApiResponse } from "next";
import data from "../../../public/data.json";
import { SortDirection } from "@react-types/shared";
import { Student } from "@/api/students/types";

interface FetchStudentsRequest extends NextApiRequest {
  query: {
    limit: string;
    page: string;
    sort: "name" | "module" | "progress" | "lesson";
    direction: SortDirection;
  };
}

export default async function handler(
  req: FetchStudentsRequest,
  res: NextApiResponse<{ students: Student[]; totalCount: number }>
) {
  const { limit = 15, page = 1, sort, direction } = req.query;
  const totalCount = data.length;
  const prevDataNum = (+page - 1) * +limit;
  if (sort && direction) {
    data.sort((a, b) => {
      const coef = direction === "descending" ? -1 : 1;
      return coef * (a[sort] > b[sort] ? 1 : -1);
    });
  }

  res
    .status(200)
    .json({ students: data.slice(prevDataNum, +limit * +page), totalCount });
}
