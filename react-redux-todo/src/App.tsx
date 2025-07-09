import React, {  useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {fetchTodos, sendTodosToBackup} from './redux/todoSlice';
import  { RootState, AppDispatch } from './redux/store';
import  './ToDoList.css';
import {ToDoList} from "./components/ToDo/ToDoList/ToDoList";
import {InputContainer} from "./components/InputContainer/InputContainer";
import {Button} from "./components/Button/Button";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { todos, loading, error } = useSelector((state: RootState) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
      <div className="app">
        <h1>Список Задач</h1>
        <InputContainer/>
        <ToDoList/>
            <Button label={"Отправить список .."}
                    className={"send-button"}
                    onClick={() => dispatch(sendTodosToBackup(todos))}
            />
      </div>
  );
}

export default App;