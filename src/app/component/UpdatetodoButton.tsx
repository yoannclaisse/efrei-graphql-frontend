// components/ButtonUpdateTodo.js
import React, { useState } from "react";
import { updateTodo } from "../utils/todoService";

const ButtonUpdateTodo = (props: any) => {
  const { todoId, initialTitle, initialDescription, onUpdate, setTodos, todos } = props;
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = async () => {
    try {
      const updatedTodo = await updateTodo(todoId, title, description);
      await onUpdate(updatedTodo);
      console.log('updatebutton :', todos)
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la todo", error);
    }
  };

  return (
    <div>
      {isEditing ? (
        <>
          <label htmlFor={`update-title-${todoId}`}>
            Title:
          </label>
          <input
            id={`update-title-${todoId}`}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Update title"
          />
          <label htmlFor={`update-description-${todoId}`}>
            Description:
          </label>
          <input
            id={`update-description-${todoId}`}
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Update description"
          />
          <button onClick={handleUpdate}>
            Save
          </button>
        </>
      ) : (
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      )}
    </div>
  );
};

export default ButtonUpdateTodo;
