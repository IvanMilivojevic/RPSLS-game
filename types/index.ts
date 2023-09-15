export type ChoiceName = "rock" | "paper" | "scissors" | "lizard" | "spock";

export type Choice = {
  id: number;
  name: ChoiceName;
};

export type ChoiceAdditional = {
  displayName: string;
  imgUrl: string;
};

export type ChoiceFullData = Choice & ChoiceAdditional;

export type Choices = Choice[];

export type ChoicesFullData = ChoiceFullData[];

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

export type GameFinishedAdditional = {
  playerChoiceName: string;
  computerChoiceName: string;
};

export type GameResultData = GameFinishedInfo & GameFinishedAdditional;

export type GameResultsFullData = GameResultData[];
