"use client";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Image from "next/image";

import { useState, useEffect } from "react";
import LogoutButton from "../component/LogoutButton";
import { TodoType } from "../lib/user/user.type";
import AddTodoForm from "../component/AddTodoForm";
import { TodoCard } from "../component/Todocard";
import TodoUpdateCard from "../component/TodoUpdateCard";

const DashboardPage = () => {
  const [username, setUsername] = useState(null);
  const [todos, setTodos] = useState<TodoType[]>([]);
  const userId = localStorage.getItem("userId");
  const { push } = useRouter();

  useEffect(() => {
    if (!userId) {
      push(`/`);
    } else {
      handleLogin(Number(userId));
    }
  }, [push, userId]);

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
      setUsername(data.userWithTodosById.username);
      console.log("DATA TODO LIST:", data.userWithTodosById.todos)
      setTodos(data.userWithTodosById.todos);

    } catch (error) {
      console.error("Error:", error);
    }
  };


  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <div className={styles.headerContainer}>
          {username && <h1 className="text-2xl font-bold text-zinc-50">Hello {username} how're you today ?</h1>}
          <LogoutButton />
        </div>
      </div>
      <div className={styles.addTodo}>
        <div className={styles.addTodoContainer}>
          
          <h2 className="text-2xl font-bold text-zinc-50">Add Todo</h2>
          <AddTodoForm userId={userId} todos={todos} setTodos={setTodos} />
        </div>
      </div>
      <div className={styles.containerCard}>
        <div className={styles.wrapperCard}>
        <div className={`${styles.newTodo} text-2xl font-bold text-zinc-50 mt-5`}>What do you have to do :</div>
          {todos.map((todo) => (
            <div className={styles.card2} key={todo.id}>
              {todo.isEditing ? (
                <TodoUpdateCard
                  todo={todo}
                  setTodos={setTodos}
                  todos={todos}
                />) : (<TodoCard
                  todo={todo}
                  setTodos={setTodos}
                  todos={todos} />)
              }
            </div>))}
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
