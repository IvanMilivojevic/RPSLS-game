import { GetStaticPropsResult } from "next";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Choices } from "@/types";

interface HomePageProps {
  choices: Choices;
}

const inter = Inter({ subsets: ["latin"] });

export async function getStaticProps(): Promise<GetStaticPropsResult<HomePageProps>> {
  const response = await fetch("http://localhost:3000/api/choices");
  const choices = await response.json();

  return { props: { choices } };
}

const Home = ({ choices }: HomePageProps) => {
  const handleUserChoice = async (choiceId: number) => {
    const response = await fetch("/api/play", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        player: choiceId,
      }),
    });
  };

  return (
    <>
      <Head>
        <title>RPSLS Game</title>
        <meta name="description" content="RPSLS Game" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.description}></div>

        <div className={styles.center}>
          <div>
            {choices.map(({ id, name }) => {
              return (
                <div key={id} onClick={() => handleUserChoice(id)}>
                  {name}
                </div>
              );
            })}
          </div>
          <button>Play game</button>
        </div>
      </main>
    </>
  );
};

export default Home;
