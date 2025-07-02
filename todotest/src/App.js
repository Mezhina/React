import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');

  // Загрузка списка из local storage
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  //сохранение в JSON
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);


  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: newTodo.trim(), completed: false }]);
      setNewTodo('');
    }
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = () => {
    if (filter === 'active') {
      return todos.filter((todo) => !todo.completed);
    }
    if (filter === 'completed') {
      return todos.filter((todo) => todo.completed);
    }
    return todos;
  };

  return (
    <div className="app">
      <h1>Todo List</h1>

      <div className="input-container">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Добавьте новую задачу..."
        />
        <button onClick={addTodo}></button>
      </div>

      <ul>
        {filteredTodos().map((todo) => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            <span className="todo-text">{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)} className="delete-button"></button>
          </li>
        ))}
      </ul>

      <div className="footer">
        <div>
          <div className="counter">{todos.filter(todo => !todo.completed).length} </div>
          <div>Активных задач</div>
        </div>
        <div className="filter-container">
            <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active-filter' : ''}> Все</button>
            <button onClick={() => setFilter('active')} className={filter === 'active' ? 'active-filter' : ''}>Активные</button>
            <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active-filter' : ''}>Завершенные</button>
        </div>

        {todos.some((todo) => todo.completed) && (
          <button onClick={clearCompleted} className="clear-button"> </button>
        )}
      </div>
    </div>
  );

}

export default App;