'use client'

import { useEffect, useState } from 'react';

const Header = () => {
    const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Vérifie si l'utilisateur est connecté en récupérant les informations depuis le localStorage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    console.log("STOREUN :", storedUsername)
  }, []);
  

  return (
    <header>
      {username ? <p>Hello, {username}</p> : null}
    </header>
  );
};

export default Header;
