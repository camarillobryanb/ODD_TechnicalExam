const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

/** Routes */
// Create
app.post("/todos", async(req, res) => {
    try {
        const { title } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (title) VALUES($1) RETURNING *", [title]);
        
        res.json(newTodo.rows[0]); 
    } catch (error) {
        console.error(error.message);
    }
});

// Read
app.get("/todos", async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (error) {
        console.error(error.message);
    }
});

app.get("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(todo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});

// Update
app.put("/todos/:id", async(req, res) =>{
    try {
        const { id } =  req.params;
        const { title } = req.body;
        const updateTodo = await pool.query("UPDATE todo SET title = $1 WHERE todo_id = $2", [title, id]);
        res.json("Updated!");
    } catch (error) {
        console.error(error.message);
    }
});

// Delete
app.delete("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Deleted!")
    } catch (error) {
        console.error(error.message);
    }
});

app.listen(5000, () => {
    console.log("Server on port 5000")
});

