import { readFile, unlink } from "fs/promises";
import type { NextApiRequest, NextApiResponse } from "next";
import { Choices, GameFinishedInfo, GameResultsFullData } from "@/types";
import { capitalizeFirstLetter } from "@/lib/utills";

async function handleResults(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    await unlink("content/results.json");
    res.status(200).end();
    return;
  }

  const responseChoices = await fetch("http://localhost:3000/api/choices");
  const choices: Choices = await responseChoices.json();

  let gameResults: GameResultsFullData;
  const choicesNameMap: Record<string, string> = {};

  choices.forEach(choice => {
    choicesNameMap[choice.id] = capitalizeFirstLetter(choice.name);
  });

  try {
    const rawResults = await readFile("content/results.json");
    const results: GameFinishedInfo[] = JSON.parse(rawResults.toString());
    gameResults = results.slice(0, 10).map(result => ({
      ...result,
      playerChoiceName: choicesNameMap[result.player],
      computerChoiceName: choicesNameMap[result.computer],
    }));
  } catch (error) {
    gameResults = [];
  }

  res.status(200).json(gameResults);
}

export default handleResults;
