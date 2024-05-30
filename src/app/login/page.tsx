"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoginButton from "../component/LoginButton";
import BackToHomeButton from "../component/backToHommeButton";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { push } = useRouter();

  return (
    <div>
      <div>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <LoginButton />
      </div>
      <BackToHomeButton />
    </div>
  );
};

export default LoginPage;
