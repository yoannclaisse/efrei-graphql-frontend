import { useState } from "react";
import { addTodo } from "../utils/todoService";
import { TodoType } from "../lib/user/user.type";

const AddTodoForm = (props: any) => {
  const { userId, todos } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTodo = async () => {
    try {
      alert(`Title: ${title}, Description: ${description}, id: ${userId}`);
      const todoAdded = await addTodo(title, description, Number(userId));
      props.setTodos([...props.todos, todoAdded])
      setTitle("");
      setDescription("");
    } catch {}
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="button" onClick={handleAddTodo}>
        Add Todo
      </button>
    </form>
  );
};

export default AddTodoForm;
