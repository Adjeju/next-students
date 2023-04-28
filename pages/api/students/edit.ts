import type { NextApiRequest, NextApiResponse } from "next";
import fs from "node:fs/promises";
import { studentsDB } from "./inMemoryDB";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { progress, id } = JSON.parse(req.body);

  const idx = studentsDB.findIndex((s) => s.id === id);

  studentsDB[idx].progress = progress;

  res.status(200).json({ result: `success` });
}
