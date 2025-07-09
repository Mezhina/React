import React, {useState} from "react";
import {addTodo} from "../../redux/todoSlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux/store";

import './inputContainer.css'

export const InputContainer = () => {
    const [newTodo, setNewTodo] = useState<string>('');
    const dispatch = useDispatch<AppDispatch>();

    const handleAddTodo = () => {
        if (newTodo.trim() !== '') {
            dispatch(addTodo(newTodo.trim()));
            setNewTodo('');
        }
    };

    return(
        <div className="input-container">
        <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Новая задача..."
        />
        <button onClick={handleAddTodo}>+</button>
    </div>)
}