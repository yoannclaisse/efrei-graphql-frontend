import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default async function HomePage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1>💊💊💊💊 Welcome in ToDoLab 🧪🧪🧪🧪</h1>
        <div className={styles.containerButton}>
          <Link href="/login" className={styles.button}>
            Connexion
          </Link>
          <Link href="/signin" className={styles.button}>
            Création de compte
          </Link>
        </div>
      </div>
    </main>
  );
}
