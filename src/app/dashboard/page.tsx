"use client";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Image from "next/image";

import { useState, useEffect } from "react";
import LogoutButton from "../component/LogoutButton";
import { TodoType } from "../lib/user/user.type";
import AddTodoForm from "../component/AddTodoForm";
import ButtonDeleteTodo from "../component/DeleteTodoButton";
import ButtonUpdateTodo from "../component/UpdatetodoButton";

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
      setUsername(data.userWithTodosById.username);
      console.log("DATA TODO LIST:", data.userWithTodosById.todos)
      setTodos(data.userWithTodosById.todos);
      
    } catch (error) {
      console.error("Error:", error);
    }
  };



  const handleUpdate = (updatedTodo: any) => {
    console.log(todos)
    setTodos(
      todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1>Page de Profil</h1>
        {username && <h2>Hello {username}</h2>}
        <h1>Add Todo</h1>
        <AddTodoForm userId={userId} todos={todos} setTodos={setTodos} />
        <LogoutButton />
      </div>
      <div className={styles.newTodo}>todo here</div>
      <div className={styles.containerCard}>
        <div className={styles.wrapperCard}>
          {todos.map((todo) => (
            <div className={styles.card}>
              <div className={styles.todoCardTitle}>
                <h3>{todo.title}</h3>
                <Image
                  src="/images/blocNote.png"
                  width={30}
                  height={30}
                  alt={todo.title}
                  className={styles.todoCardImage}
                />
              </div>
              <p className={styles.todoCardDescription}>{todo.description}</p>
              <div className={styles.todoCardBottom}>
                <button className={styles.todoCardBottomComplete}>
                  Completed: {todo.completed ? "Yes" : "No"}
                </button>
                <ButtonDeleteTodo todoId={todo.id} setTodos={setTodos} todos={todos}/>
                <ButtonUpdateTodo
                  todoId={todo.id}
                  initialTitle={todo.title}
                  initialDescription={todo.description}
                  onUpdate={handleUpdate}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
