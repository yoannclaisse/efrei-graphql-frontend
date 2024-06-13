export const addTodo = async (title: string, description: string, userId: number) => {
    try {
        const response = await fetch("http://localhost:3001/graphql", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                operationName: "CreateTodo",
                variables: {
                    data: {
                        title: title,
                        description: description,
                        userId: userId
                    }
                },
                query: `
          mutation CreateTodo($data: CreateTodoInput!) {
            createTodo(data: $data) {
              title
              description
              id
            }
          }
          `,
            }),
        });

        const json = await response.json();
        const data = json.data;
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

export const updateTodo = async (todoId: any, newTitle: any, newDescription: any) => {
    try {
        const response = await fetch("http://localhost:3001/graphql", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                operationName: "UpdateTodo",
                variables: {
                    id: todoId,
                    title: newTitle,
                    description: newDescription,
                  },
                  query: `
                    mutation UpdateTodo($id: Int!, $title: String!, $description: String) {
                      updateTodoById(id: $id, title: $title, description: $description) {
                        id
                        title
                        description
                      }
                    }
                  `,
            }),
        });

        const json = await response.json();
        const data = json.data;
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

export const deleteTodo = async (todoId: number) => {
    try {
        const response = await fetch("http://localhost:3001/graphql", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                operationName: "DeleteTodo",
                variables: { id: todoId },
                query: `
          mutation DeleteTodo($id: Int!) {
            deleteTodoById(id: $id) {
              id
            }
          }
          `,
            }),
        });

        const json = await response.json();
        const data = json.data;
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





