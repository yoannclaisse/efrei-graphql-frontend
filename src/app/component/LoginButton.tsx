"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LoginButton = () => {
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
    <div>
      <button onClick={handleLogin}>Connextion</button>
    </div>
  );
};

export default LoginButton;
