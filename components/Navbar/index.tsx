import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { pathname } = useRouter();

  return (
    <ul className={styles.navbar}>
      <li className={pathname == "/" ? styles.active : ""}>
        <Link href="/">GAME</Link>
      </li>
      <li className={pathname == "/scoreboard" ? styles.active : ""}>
        <Link href="/scoreboard">SCOREBOARD</Link>
      </li>
      <li className={pathname == "/login" ? styles.active : ""}>
        <Link href="/login">LOGIN</Link>
      </li>
    </ul>
  );
};

export default Navbar;
