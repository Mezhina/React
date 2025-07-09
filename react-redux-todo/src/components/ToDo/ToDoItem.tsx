import React from 'react';

import {AppDispatch} from "../../redux/store"
import { useDispatch} from 'react-redux';
import { deleteTodo, Todo, toggleComplete} from "../../redux/todoSlice";
import {Button} from "../Button/Button";

export interface IToDoEntity {
    id: number;
    text?: string;
    completed?: boolean
}

export type TToDoItem = {
    item: IToDoEntity;
    id?: number;
    text?: string;
    completed?: boolean
};

export const ToDoItem = ({item}: TToDoItem) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleToggleComplete = (todo: IToDoEntity) => {
        dispatch(toggleComplete(todo as Todo));
    };

    return (
        <li key={item.id} className={`todo-item ${item.completed ? 'completed' : ''}`}>
            <input
                type="checkbox"
                checked={item.completed}
                onChange={() => handleToggleComplete(item)}
            />
            <span className="todo-text">{item.text}</span>
            <Button
                label={"Delete"}
                className={"delete-button"}
                onClick={() => dispatch(deleteTodo(item.id))}
            />

        </li>
    )
}