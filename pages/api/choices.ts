import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  choice: string;
};

function handleChoices(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ choice: "rock" });
}

export default handleChoices;
