import type { NextApiRequest, NextApiResponse } from "next";
import { readFile } from "fs/promises";

export type Choices = {
  id: number;
  name: "rock" | "paper" | "scissors" | "lizard" | "spock";
}[];

async function handleChoices(req: NextApiRequest, res: NextApiResponse<Choices>) {
  const rawContent = await readFile("content/choices.json");
  const choices: Choices = JSON.parse(rawContent.toString());
  res.status(200).json(choices);
}

export default handleChoices;
