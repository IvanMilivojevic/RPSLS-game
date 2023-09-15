import { GetServerSidePropsResult } from "next";
import { GameResultsFullData } from "@/types";
import Scoreboard from "@/components/Scoreboard";
import styles from "@/styles/ScoreboardPage.module.css";

interface ScoreboardPageProps {
  results: GameResultsFullData;
}

// Fetching results could have been also implemented with client side fetching
// Simply used as an approach to show the different ways in Next.js
export async function getServerSideProps(): Promise<GetServerSidePropsResult<ScoreboardPageProps>> {
  const response = await fetch("http://localhost:3000/api/results");
  const results: GameResultsFullData = await response.json();

  return { props: { results } };
}

const ScoreboardPage = ({ results }: ScoreboardPageProps) => {
  return (
    <main className={`${styles.main}`}>
      <Scoreboard results={results} />
    </main>
  );
};

export default ScoreboardPage;
