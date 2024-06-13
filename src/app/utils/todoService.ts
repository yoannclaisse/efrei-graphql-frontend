import { gql } from "@apollo/client";
import apolloClient from "../lib/apollo.server"

const ADD_TODO_MUTATION = gql`
  mutation CreateTodo($data: CreateTodoInput!) {
    createTodo(data: $data) {
      title
      description
      id
    }
  }
`;

export const addTodo = async (title: string, description: string, userId: number) => {
    try {
        const { data } = await apolloClient.mutate({
            mutation: ADD_TODO_MUTATION,
            variables: {
                data: {
                    title: title,
                    description: description,
                    userId: userId,
                }
            }
        });

        console.log("DATA TODO CREATION", data);

        if (data && data.createTodo) {
            return data.createTodo;
        } else {
            throw new Error("Erreur lors de la création de la todo");
        }
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

const UPDATE_TODO_MUTATION = gql`
  mutation UpdateTodo($id: Int!, $title: String!, $description: String) {
    updateTodoById(id: $id, title: $title, description: $description) {
      id
      title
      description
    }
  }
`;

export const updateTodo = async (todoId: number, newTitle: string, newDescription: string) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_TODO_MUTATION,
        variables: {
          id: todoId,
          title: newTitle,
          description: newDescription,
        },
      });
  
      console.log("DATA TODO UPDATE", data);
  
      if (!!data && !!data.updateTodoById) {
        return data.updateTodoById;
      } else {
        throw new Error("Erreur lors de la mise à jour de la todo");
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

const DELETE_TODO_MUTATION = gql`
  mutation DeleteTodo($id: Int!) {
    deleteTodoById(id: $id) {
      id
    }
  }
`;

export const deleteTodo = async (todoId: number) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: DELETE_TODO_MUTATION,
        variables: {
          id: todoId,
        },
      });
  
      console.log("DATA TODO DELETION", data);
  
      if (!!data && !!data.deleteTodoById) {
        return data.deleteTodoById;
      } else {
        throw new Error("Erreur lors de la suppression de la todo");
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };