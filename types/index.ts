export type ChoiceName = "rock" | "paper" | "scissors" | "lizard" | "spock";

export type Choice = {
  id: number;
  name: ChoiceName;
};

export type Choices = Choice[];

export type RandomNumber = {
  random_number: number;
};

export type GameResult = "win" | "lose" | "tie";

export type PlayGameRequestBody = {
  player: number;
};

export type GameFinishedInfo = {
  results: GameResult;
  player: number;
  computer: number;
};
