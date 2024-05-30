"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
      console.log(data);

      if (!!data && !!data.getUserId) {
        // push(`/dashboard?username=${username}`);
        localStorage.setItem('userId', data.getUserId)
        push(`/dashboard`);
      } else {
        alert("Identifiants incorrects");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
        <button onClick={handleLogin}>Login</button>
      </div>
      <Link href="/">
        <button>
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default LoginPage;


