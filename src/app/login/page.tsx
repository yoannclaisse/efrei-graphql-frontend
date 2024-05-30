"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import BackToHomeButton from "../component/backToHomeButton";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { push } = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3001/graphql", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          operationName: null,
          variables: {
            username: username,
            password: password,
          },
          query:
            "query ($username: String!, $password: String!) {\n  getUserId(username: $username, password: $password)\n}\n",
        }),
      });

      const json = await response.json();
      const data = json.data;
      console.log("DATA LOGIN PAGE", data);

      if (!!data && !!data.getUserId) {
        // push(`/dashboard?username=${username}`);
        localStorage.setItem("userId", data.getUserId);
        push(`/dashboard`);
      } else {
        alert("Identifiants incorrects");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.h1}>Enter your credentials</h1>
        <div className={styles.containerInput}>
          <input
            className={styles.input}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.containerButton}>
          <button onClick={handleLogin} className={styles.button}>
            Connection
          </button>
          <BackToHomeButton />
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
