import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3001/todos'; // Replace with your actual API URL
const BACKUP_API_URL = 'http://localhost:4000/todos'; // New endpoint for sending todos

export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

interface TodoState {
    todos: Todo[];
    loading: boolean;
    error: string | null;
}

const initialState: TodoState = {
    todos: [],
    loading: false,
    error: null,
};

// Async
export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async () => {
        const response = await axios.get<Todo[]>(API_URL);
        return response.data;
    }
);

export const addTodo = createAsyncThunk(
    'todos/addTodo',
    async (text: string) => {
        const response = await axios.post<Todo>(API_URL, { text, completed: false });
        return response.data;
    }
);

export const toggleComplete = createAsyncThunk(
    'todos/toggleComplete',
    async (todo: Todo) => {
        const response = await axios.put<Todo>(`${API_URL}/${todo.id}`, { ...todo, completed: !todo.completed });
        return response.data;
    }
);

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async (id: number) => {
        await axios.delete(`${API_URL}/${id}`);
        return id;
    }
);

export const sendTodosToBackup = createAsyncThunk(
    'todos/sendTodosToBackup',
    async (todos: Todo[]) => {
        try {
            const response = await axios.post(BACKUP_API_URL, todos); // Посылаем весь список
            return response.data;
        } catch (error: any) {
            // Ошибки
            console.error("Error sending todos to backup:", error);
            throw error;
        }
    }
);

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        // Example of a synchronous reducer (not used in this example, but shows the syntax)
        // setTodos:
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
                state.loading = false;
                state.todos = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Не удалось получить задачи.";
            })
            .addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
                state.todos.push(action.payload);
            })
            .addCase(toggleComplete.fulfilled, (state, action: PayloadAction<Todo>) => {
                state.todos = state.todos.map(todo =>
                    todo.id === action.payload.id ? action.payload : todo
                );
            })
            .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<number>) => {
                state.todos = state.todos.filter((todo) => todo.id !== action.payload);
            })
            .addCase(sendTodosToBackup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendTodosToBackup.fulfilled, (state, action) => {
                state.loading = false;

            })
            .addCase(sendTodosToBackup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to send todos to backup.";
            });

    }
});

export default todoSlice.reducer;