import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default async function HomePage() {

  return (
    <main >
      <div>
      <h1>Bienvenue sur la page d'accueil</h1>
      <Link href="/login">
        Aller à la page de connexion
      </Link>
      <Link href="/signin">
        Aller à la page de création de compte
      </Link>
    </div>
    </main>
  );
}
