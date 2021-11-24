import React, { Fragment, useState, useEffect } from 'react';
import './App.css';
import Update from "./Update";

function App() {
  const [title, setTitle] = useState("");

  const formOnSubmit = async e => {
    e.preventDefault();
    try {
      const body = { title };
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      window.location.reload();
    } catch (error) {
      console.error(error.message);
    }
  }

  const [todos, setTodos] = useState([]);

  const getTodos = async() => {
    try {
      const response = await fetch("http://localhost:5000/todos")
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getTodos()
  }, []);

  const deleteTodo = async(id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE"
      })
      window.location.reload();
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <Fragment>
      <h1>On Demand Deals</h1>
      {/* CREATE */}
      <form onSubmit={formOnSubmit}>
        <input 
          type="text"
          className="form-control"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <button class="btn btn-success">Add</button>
      </form>
      {/* READ */}
      {todos.map(todo => (
        <Fragment>
          <div class="card">
            <div class="card-body">
              <div key={todo.todo_id}>
                <h3>{todo.title}</h3>
                {/* UPDATE */}
                <Update todo={todo}/>
                {/* DELETE */}
                <button class="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button>
              </div>
            </div>
          </div>
        </Fragment>
      ))}
    </Fragment>
  );
}

export default App;