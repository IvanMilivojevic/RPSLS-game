import { GameResultsFullData } from "@/types";
import styles from "./Scoreboard.module.css";

interface IScoreboardProps {
  results: GameResultsFullData;
}

const Scoreboard = ({ results }: IScoreboardProps) => {
  return (
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
  );
};

export default Scoreboard;
