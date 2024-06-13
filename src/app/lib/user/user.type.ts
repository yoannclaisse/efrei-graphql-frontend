export type TodoType = {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    createdAt: number;
    updatedAt: number;
    isEditing?: boolean;
};