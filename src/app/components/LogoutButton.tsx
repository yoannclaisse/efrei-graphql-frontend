"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Supprime l'élément du localStorage
    localStorage.removeItem("authToken");

    console.log('Contenu du localStorage après déconnexion:', localStorage);

    // Redirige l'utilisateur vers la page de connexion
    router.push("/");
  };

  return (
    <div>
      <button onClick={handleLogout}>
        Déconnexion
      </button>
    </div>
  );
};

export default LogoutButton;
