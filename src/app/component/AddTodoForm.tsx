import { useState } from "react";
import { addTodo } from "../utils/todoService";
import { TodoType } from "../lib/user/user.type";
import styles from "./addTodoForm.module.css";

const AddTodoForm = (props: any) => {
  const { userId, todos } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTodo = async () => {
    try {
      // alert(`Title: ${title}, Description: ${description}, id: ${userId}`);
      const todoAdded = await addTodo(title, description, Number(userId));
      props.setTodos([...props.todos, todoAdded])
      setTitle("");
      setDescription("");
    } catch { }
  };

  return (
    <form className={styles.formAddTodo} onSubmit={(e) => e.preventDefault()}>
      <div className={styles.titleDescContainer}>
        <div className={styles.titleInput}>
          <label className="font-bold text-zinc-50 mt-10" htmlFor="title">Title:</label>
          <input
            className={styles.input}
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.descInput}>
          <label className="font-bold text-zinc-50" htmlFor="description">Description:</label>
          <textarea
          className={styles.input}
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.addTodoButtonContainer}>
        <button className={styles.addTodoButton} type="button" onClick={handleAddTodo}>
          Add Todo
        </button>
      </div>
    </form>
  );
};

export default AddTodoForm;
