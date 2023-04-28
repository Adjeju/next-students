import type { NextApiRequest, NextApiResponse } from "next";
import data from "../../../public/data.json";
import fs from "node:fs/promises";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const { progress } = JSON.parse(req.body);

  const idx = data.findIndex((s) => s.id === id);

  const copy = [...data];
  copy[idx].progress = progress;

  await fs.writeFile("public/data.json", JSON.stringify(copy));

  res.status(200).json({ result: `success` });
}
