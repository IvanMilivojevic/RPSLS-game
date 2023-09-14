import type { NextApiRequest, NextApiResponse } from "next";
import { Choices, Choice } from "@/types";

async function handlePlay(req: NextApiRequest, res: NextApiResponse) {
  const responseChoices = await fetch("http://localhost:3000/api/choices");
  const choices: Choices = await responseChoices.json();

  const responseRandomChoice = await fetch("http://localhost:3000/api/choice");
  const { id: computerChoiceId, name: computerChoiceName }: Choice =
    await responseRandomChoice.json();

  const { player: playerChoiceId } = req.body;
  const { name: playerChoiceName } = choices.find(choice => choice.id === playerChoiceId)!;

  res.status(200).json(choices);
}

export default handlePlay;
