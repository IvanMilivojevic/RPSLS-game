import type { NextApiRequest, NextApiResponse } from "next";
import { RandomNumber } from "@/types";

async function handleRandomNumber(req: NextApiRequest, res: NextApiResponse<RandomNumber>) {
  const randomNumber = Math.floor(Math.random() * 100) + 1;

  res.status(200).json({ random_number: randomNumber });
}

export default handleRandomNumber;
