import React from "react";
import { RootState} from "../../../redux/store"
import { useSelector } from 'react-redux';
import {ToDoItem} from "../ToDoItem";


export const ToDoList = () => {
    const { todos } = useSelector((state: RootState) => state.todos);

    return (
        <ul>
            {todos.map((todo) => (
                <ToDoItem
                    id={todo.id}
                    text={todo.text}
                    completed={todo.completed}
                    item={todo}
                />
            ))}
        </ul>
    )
}