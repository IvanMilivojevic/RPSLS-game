import { GetStaticPropsResult } from "next";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useState, useCallback } from "react";
import { Choices, ChoicesFullData, ChoiceFullData, GameFinishedInfo } from "@/types";
import { capitalizeFirstLetter } from "@/lib/utills";
import styles from "@/styles/HomePage.module.css";

interface HomePageProps {
  choices: ChoicesFullData;
}

const inter = Inter({ subsets: ["latin"] });

export async function getStaticProps(): Promise<GetStaticPropsResult<HomePageProps>> {
  const response = await fetch("http://localhost:3000/api/choices");
  const choices: Choices = await response.json();

  const choicesData: ChoicesFullData = choices.map(choice => ({
    ...choice,
    displayName: capitalizeFirstLetter(choice.name),
    imgUrl: `/${choice.name}-image.png`,
  }));

  return { props: { choices: choicesData } };
}

const HomePage = ({ choices }: HomePageProps) => {
  const [gameFinishedInfo, setGameFinishedInfo] = useState<GameFinishedInfo>();
  const [userChoice, setUserChoice] = useState<number>();
  const [computerChoice, setComputerChoice] = useState<ChoiceFullData>();

  const playGame = useCallback(async () => {
    const response = await fetch("/api/play", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        player: userChoice,
      }),
    });
    const gameFinishedInfo: GameFinishedInfo = await response.json();

    const computerChoice = choices.find(choice => choice.id === gameFinishedInfo.computer)!;

    setGameFinishedInfo(gameFinishedInfo);
    setComputerChoice(computerChoice);
  }, [choices, userChoice]);

  return (
    <>
      <Head>
        <title>RPSLS Game</title>
        <meta name="description" content="RPSLS Game" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.center}>
          <div className={styles.choicesList}>
            {choices.map(({ id, name, displayName, imgUrl }) => {
              return (
                <div
                  key={id}
                  onClick={() => setUserChoice(id)}
                  className={`${styles.choice} ${id === userChoice ? styles.active : ""}`}
                >
                  <Image src={imgUrl} alt={displayName} width={100} height={100} />
                  <span className={styles.choiceTitle}>{displayName}</span>
                </div>
              );
            })}
          </div>
          <div className={styles.infoColumn}>
            {gameFinishedInfo && (
              <div
                className={`${styles.gameResult} ${
                  gameFinishedInfo.results === "win"
                    ? styles.success
                    : gameFinishedInfo.results === "lose"
                    ? styles.fail
                    : styles.equal
                }`}
              >
                {gameFinishedInfo.results}
              </div>
            )}
            <div className={styles.versus}>VS</div>
            <button onClick={playGame} className={styles.playButton} disabled={!userChoice}>
              Play game
            </button>
          </div>
          <div>
            {computerChoice ? (
              <div className={styles.choice}>
                <Image
                  src={computerChoice.imgUrl}
                  alt={computerChoice.displayName}
                  width={100}
                  height={100}
                />
                <span className={styles.choiceTitle}>{computerChoice.displayName}</span>
              </div>
            ) : (
              <Image src="/question-mark-image.png" alt="Question Mark" width={100} height={100} />
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default HomePage;
