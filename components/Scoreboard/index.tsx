import { useRouter } from "next/router";
import { useCallback } from "react";
import { GameResultsFullData } from "@/types";
import styles from "./Scoreboard.module.css";

interface IScoreboardProps {
  results: GameResultsFullData;
}

const Scoreboard = ({ results }: IScoreboardProps) => {
  const router = useRouter();

  const resetTable = useCallback(async () => {
    try {
      await fetch("/api/results", {
        method: "DELETE",
      });

      // A solution to revalidate server props https://stackoverflow.com/a/75650798
      // Needed so that when we delete records we instantly want to show empty records
      router.replace(router.asPath);
    } catch (error) {
      console.log(error);
    }
  }, [router]);

  if (results.length === 0) {
    return <div>There are no records for game.</div>;
  }

  return (
    <>
      <div className={styles.table}>
        <div className={styles.heading}>
          <span>Player Choice</span>
          <span>Computer Choice</span>
          <span>Result</span>
        </div>
        <div className={styles.body}>
          {results.map((result, index) => {
            return (
              <div className={styles.bodyRow} key={index}>
                <span>{result.playerChoiceName}</span>
                <span>{result.computerChoiceName}</span>
                <span
                  className={
                    result.results === "win"
                      ? styles.success
                      : result.results === "lose"
                      ? styles.fail
                      : styles.equal
                  }
                >
                  {result.results.toUpperCase()}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.tableReset}>
        <button onClick={resetTable}>Reset Results</button>
      </div>
    </>
  );
};

export default Scoreboard;
