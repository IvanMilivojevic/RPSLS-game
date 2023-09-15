import { ChoiceName, GameResult } from "@/types";

export const calculateGameResult = (
  playerChoiceName: ChoiceName,
  computerChoiceName: ChoiceName
) => {
  let gameResult: GameResult;

  // We could add ENUM and replace all hardcoded strings also
  switch (playerChoiceName) {
    case "rock":
      if (computerChoiceName === "lizard" || computerChoiceName === "scissors") {
        gameResult = "win";
      } else if (computerChoiceName === "paper" || computerChoiceName === "spock") {
        gameResult = "lose";
      } else {
        gameResult = "tie";
      }
      break;
    case "paper":
      if (computerChoiceName === "rock" || computerChoiceName === "spock") {
        gameResult = "win";
      } else if (computerChoiceName === "lizard" || computerChoiceName === "scissors") {
        gameResult = "lose";
      } else {
        gameResult = "tie";
      }
      break;
    case "scissors":
      if (computerChoiceName === "paper" || computerChoiceName === "lizard") {
        gameResult = "win";
      } else if (computerChoiceName === "rock" || computerChoiceName === "spock") {
        gameResult = "lose";
      } else {
        gameResult = "tie";
      }
      break;
    case "lizard":
      if (computerChoiceName === "paper" || computerChoiceName === "spock") {
        gameResult = "win";
      } else if (computerChoiceName === "rock" || computerChoiceName === "scissors") {
        gameResult = "lose";
      } else {
        gameResult = "tie";
      }
      break;
    case "spock":
      if (computerChoiceName === "rock" || computerChoiceName === "scissors") {
        gameResult = "win";
      } else if (computerChoiceName === "lizard" || computerChoiceName === "paper") {
        gameResult = "lose";
      } else {
        gameResult = "tie";
      }
      break;
  }

  return gameResult;
};

export const capitalizeFirstLetter = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};
