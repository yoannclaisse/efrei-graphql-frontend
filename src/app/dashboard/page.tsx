"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LogoutButton from "../components/LogoutButton";
import { TodoType } from "../lib/user/user.type";

const DashboardPage = () => {
  const [username, setUsername] = useState(null); // État local pour stocker le nom d'utilisateur
  const [todos, setTodos] = useState<TodoType[]>([]);
  const userId = localStorage.getItem("userId");
  const { push } = useRouter();

  useEffect(() => {
    if (!userId) {
      push(`/`);
    } else {
      handleLogin(Number(userId));
    }
  }, [userId]);

  const handleLogin = async (userId: Number) => {
    console.log("USERID DASHBOARD PAGE :", userId);
    try {
      const response = await fetch("http://localhost:3001/graphql", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          operationName: null,
          variables: {
            userId: userId,
          },
          query: `query GetUserWithTodosById($userId: Int!) {
            userWithTodosById(id: $userId) {
                id
                username
                email
                todos {
                    id
                    title
                    description
                    completed
                    createdAt
                    updatedAt
                }
            }
        }`,
        }),
      });

      const json = await response.json();
      const data = json.data;
      // console.log("DATA DASHBOARD PAGE :", data.userWithTodosById.todos);
      // Mise à jour de l'état avec le nom d'utilisateur
      setUsername(data.userWithTodosById.username);
      // Met à jour les todos dans l'état local
      setTodos(data.userWithTodosById.todos);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Page de Profil</h1>
      {username && <h2>Hello {username}</h2>}
      <div>
        {todos.map((todo) => (
          <div>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <p>Completed: {todo.completed ? "Yes" : "No"}</p>
          </div>
        ))}
      </div>
      <LogoutButton />
    </div>
  );
};

export default DashboardPage;
