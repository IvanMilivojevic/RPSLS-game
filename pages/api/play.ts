import { readFile, writeFile } from "fs/promises";
import type { NextApiRequest, NextApiResponse } from "next";
import { Choices, Choice, PlayGameRequestBody, GameFinishedInfo } from "@/types";
import { calculateGameResult } from "@/lib/utills";

async function handlePlay(req: NextApiRequest, res: NextApiResponse<GameFinishedInfo>) {
  const responseChoices = await fetch("http://localhost:3000/api/choices");
  const choices: Choices = await responseChoices.json();

  let computerChoice: Choice;

  try {
    const responseRandomChoice = await fetch("http://localhost:3000/api/choice");
    const randomChoice: Choice = await responseRandomChoice.json();

    computerChoice = randomChoice;
  } catch (error) {
    res.status(500).end();
    return;
  }

  const { id: computerChoiceId, name: computerChoiceName } = computerChoice;

  const { player: playerChoiceId }: PlayGameRequestBody = req.body;
  const { name: playerChoiceName } = choices.find(choice => choice.id === playerChoiceId)!;

  const gameResult = calculateGameResult(playerChoiceName, computerChoiceName);

  const gameFinishedInfo: GameFinishedInfo = {
    results: gameResult,
    player: playerChoiceId,
    computer: computerChoiceId,
  };

  try {
    const rawResults = await readFile("content/results.json");
    const results: GameFinishedInfo[] = JSON.parse(rawResults.toString());
    results.unshift(gameFinishedInfo);
    await writeFile("content/results.json", JSON.stringify(results));
  } catch (error) {
    await writeFile("content/results.json", JSON.stringify([gameFinishedInfo]));
  }

  res.status(200).json(gameFinishedInfo);
}

export default handlePlay;
