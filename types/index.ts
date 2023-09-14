export type Choice = {
  id: number;
  name: "rock" | "paper" | "scissors" | "lizard" | "spock";
};

export type Choices = Choice[];

export type RandomNumber = {
  random_number: number;
};
