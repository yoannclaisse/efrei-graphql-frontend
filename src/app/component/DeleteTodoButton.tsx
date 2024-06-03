import { deleteTodo } from "../utils/todoService";

const ButtonDeleteTodo = (props: any) => {
  const { todoId, setTodos, todos } = props;
  const handleDelete = async () => {
    try {
      // console.log(todoId)
      await deleteTodo(todoId);
      // console.log(todos)
      setTodos(todos.filter((todo: any) => todo.id !== todoId));
    } catch (error) {
      console.error("Erreur lors de la suppression de la todo", error);
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default ButtonDeleteTodo;
