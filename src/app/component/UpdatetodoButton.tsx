import React, { useState } from "react";
import { updateTodo } from "../utils/todoService";
import { TodoType } from "../lib/user/user.type";

export type ButtonUpdateTodoProps = {
  todo: TodoType
  setTodos: any
  todos: TodoType[]
};

const ButtonUpdateTodo = ({ todo, setTodos,  todos }: ButtonUpdateTodoProps) => {
  // const { todo, setTodos,  onUpdate } = props;
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const handleUpdate = async () => {
    try {
      const updatedTodo = todo
      updatedTodo.isEditing = true

      // on supprime l'ancien todo non mis à jour
      let newTodos = todos.filter(t => t.id != todo.id)
      console.log("newTodos", newTodos);
      

      // la liste filtrer ne contient pas le todo à mettre à jour
      if (!!newTodos) {
        // On ajoute le todo mis à jour
        newTodos = [...newTodos, updatedTodo]
      } else {
        // On crée un tableau avec celui existant
        newTodos = [updatedTodo]
        
      }
      console.log("newTodos", newTodos);
      
      setTodos(newTodos)
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la todo", error);
    }
  };

  return (
    <div>
        <button onClick={() => handleUpdate()}>
          Edit
        </button>
    </div>
  );
};

export default ButtonUpdateTodo;
