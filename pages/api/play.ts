import type { NextApiRequest, NextApiResponse } from "next";
import { Choices, Choice, PlayGameRequestBody, GameFinishedInfo } from "@/types";
import { calculateGameResult } from "@/lib/utills";

async function handlePlay(req: NextApiRequest, res: NextApiResponse<GameFinishedInfo>) {
  const responseChoices = await fetch("http://localhost:3000/api/choices");
  const choices: Choices = await responseChoices.json();

  const responseRandomChoice = await fetch("http://localhost:3000/api/choice");
  const { id: computerChoiceId, name: computerChoiceName }: Choice =
    await responseRandomChoice.json();

  const { player: playerChoiceId }: PlayGameRequestBody = req.body;
  const { name: playerChoiceName } = choices.find(choice => choice.id === playerChoiceId)!;

  const gameResult = calculateGameResult(playerChoiceName, computerChoiceName);

  res.status(200).json({
    results: gameResult,
    player: playerChoiceId,
    computer: computerChoiceId,
  });
}

export default handlePlay;
