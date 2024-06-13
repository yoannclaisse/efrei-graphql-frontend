import { TodoType } from "../lib/user/user.type";
import Image from "next/image";
import styles from "../dashboard/page.module.css";
import ButtonSaveTodo from "./SaveTodoButton";
import { useState } from "react";

type TodoCardProps = {
    todo: TodoType;
    setTodos: any
    todos: TodoType[]
}

export const TodoUpdateCard = ({ todo, setTodos, todos }: TodoCardProps) => {
    const [editedTodo, setEditedTodo] = useState(todo);

    const onTitleChange = (e: any) => {
        
    }

    return (
        <div className={styles.card}>
            <div className={styles.todoCardTitle}>
                <h3>
                    <input onChange={(e) => {setEditedTodo({
            ...editedTodo,
            title: e.target.value
        });}} type="text" name="todoTile" id="" value={editedTodo.title}/>
                </h3>
                <Image
                    src="/images/blocNote.png"
                    width={30}
                    height={30}
                    alt={todo.title}
                    className={styles.todoCardImage}
                />
            </div>
            <p className={styles.todoCardDescription}>
                <input onChange={(e) => {setEditedTodo({
            ...editedTodo,
            description: e.target.value
        });}} type="text" name="todoDescription" id="" value={editedTodo.description}/>
            </p>
            <div className={styles.todoCardBottom}>
                
                <ButtonSaveTodo
                    todo={editedTodo}
                    setTodos={setTodos}
                    todos={todos}
                />
            </div>
        </div>
    );
};

export default TodoUpdateCard;


