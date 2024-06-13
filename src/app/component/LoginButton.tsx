"use client";
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

export const LOGIN_QUERY = gql`
  query getUserId($username: String!, $password: String!) {
    getUserId(username: $username, password: $password)
  }
`;

const LoginButton = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { push } = useRouter();

  const { loading, error, data } = useQuery(LOGIN_QUERY, {
    variables: { username, password },
  });

  const handleLogin = () => {
    if (loading) return; // Optionnel : gestion du chargement en cours

    if (error) {
      console.error("Error:", error);
      return;
    }

    if (data && data.getUserId) {
      localStorage.setItem("userId", data.getUserId);
      push(`/dashboard`);
    } else {
      alert("Identifiants incorrects");
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>Connection button component</button>
    </div>
  );
};

export default LoginButton;

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// const LoginButton = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const { push } = useRouter();

//   const handleLogin = async () => {
//     try {
//       const response = await fetch("http://localhost:3001/graphql", {
//         method: "POST",
//         headers: {
//           "content-type": "application/json",
//         },
//         body: JSON.stringify({
//           operationName: null,
//           variables: {
//             username: username,
//             password: password,
//           },
//           query:
//             "query ($username: String!, $password: String!) {\n  getUserId(username: $username, password: $password)\n}\n",
//         }),
//       });

//       const json = await response.json();
//       const data = json.data;
//       console.log("DATA LOGIN PAGE", data);

//       if (!!data && !!data.getUserId) {
//         // push(`/dashboard?username=${username}`);
//         localStorage.setItem("userId", data.getUserId);
//         push(`/dashboard`);
//       } else {
//         alert("Identifiants incorrects");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleLogin}>Connection button component</button>
//     </div>
//   );
// };

// export default LoginButton;
