import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default async function HomePage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className="text-4xl font-bold text-zinc-50">💊💊💊💊 Welcome in ToDoLab 🧪🧪🧪🧪</h1>
        <div className={styles.containerButton}>
          <Link href="/login" className={`${styles.button} font-bold bg-blue-200`}>
            Connexion
          </Link>
          <Link href="/signin" className={`${styles.button} font-bold bg-green-200`}>
            Création de compte
          </Link>
        </div>
      </div>
    </main>
  );
}
