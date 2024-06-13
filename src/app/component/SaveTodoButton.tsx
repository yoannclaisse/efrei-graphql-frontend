import React, { useState } from "react";
import { updateTodo } from "../utils/todoService";
import { TodoType } from "../lib/user/user.type";

export type ButtonUpdateTodoProps = {
  todo: TodoType
  setTodos: any
  todos: TodoType[]
};

const ButtonSaveTodo = ({ todo, setTodos,  todos }: ButtonUpdateTodoProps) => {


  const handleUpdate = async () => {
    try {
      const updatedTodo = await updateTodo(todo.id, todo.title, todo.description);
      // on desactive le mode edition
      updatedTodo.isEditing = false
      // on supprime l'ancien todo non mis à jour
      let newTodos = todos.filter(t => t.id != updatedTodo.id)
      console.log("newTodos", newTodos);

      // la liste filtrer ne contient pas le todo à mettre à jour
      if (!!newTodos) {
        // On ajoute le todo mis à jour
        newTodos = [...newTodos, updatedTodo]
      } else {
        // On crée un tableau avec celui existant
        newTodos = [updatedTodo]
        
      }
      setTodos(newTodos)
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la todo", error);
    }
  };

  return (
    <div>
        <button onClick={() => handleUpdate()}>
          Save
        </button>
    </div>
  );
};

export default ButtonSaveTodo;
