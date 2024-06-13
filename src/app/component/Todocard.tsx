import { useState } from "react";
import { TodoType } from "../lib/user/user.type";
import Image from "next/image";
import ButtonDeleteTodo from "./DeleteTodoButton";
import ButtonUpdateTodo from "./UpdatetodoButton";
import styles from "../dashboard/page.module.css";

type TodoCardProps = {
    todo: TodoType;
    setTodos: any
    todos: TodoType[]
}

export const TodoCard = ({ todo, setTodos, todos }: TodoCardProps) => {

    return (
        <div key={todo.id} className={styles.card}>
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
                <ButtonDeleteTodo todoId={todo.id} setTodos={setTodos} todos={todos} />
                <ButtonUpdateTodo
                    todo={todo}
                    setTodos={setTodos}
                    todos={todos}
                />
            </div>
        </div>
    );
};

export default ButtonDeleteTodo;


