import type { NextApiRequest, NextApiResponse } from "next";
import { Choices, RandomNumber } from "@/types";

async function handleChoice(req: NextApiRequest, res: NextApiResponse) {
  const responseChoices = await fetch("http://localhost:3000/api/choices");
  const choices: Choices = await responseChoices.json();

  try {
    // There is also an implementation of API endpoint internally on /api/random
    // It returns same value as external one and has almost instant response, but...
    // We can use external which sometimes has slower response, thus we can better simulate loading

    // const responseRandomNumber = await fetch("http://localhost:3000/api/random");

    const responseRandomNumber = await fetch("https://codechallenge.boohma.com/random");
    const { random_number }: RandomNumber = await responseRandomNumber.json();

    // We should map the random number from response to appropriate choice ID
    // Random number is 1-100 that is similar as choice IDs of 1-5 just in proportion 1:20
    // Expected result: RN 12 = Choice 1, 40 = 2, 55 = 3, 100 = 5
    const randomChoiceId = Math.ceil(random_number / 20);

    const randomChoice = choices.find(choice => choice.id === randomChoiceId)!;

    res.status(200).json(randomChoice);
  } catch (error) {
    // Error handling in case external service for random number is down, then we can not play game
    res.status(500).end();
  }
}

export default handleChoice;
