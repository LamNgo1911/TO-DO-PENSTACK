import express from "express";
import cors from "cors";
const app = express();
import { pool } from "./db";

// middleware
app.use(cors());
app.use(express.json());

// Routes
// create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (error: any) {
    console.log(error.message);
  }
});

// get all todos
app.get("/todos", async (req, res) => {
  try {
    const todos = await pool.query("SELECT * FROM todo");
    res.json(todos.rows);
  } catch (error: any) {
    console.log(error.message);
  }
});
// get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (error: any) {
    console.log(error.message);
  }
});

// update a todo
app.patch("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const newTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.json(newTodo);
  } catch (error: any) {
    console.log(error.message);
  }
});

// detele a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
    res.json(todo.rows[0]);
  } catch (error: any) {
    console.log(error.message);
  }
});
app.listen(5000, () => {
  console.log("Server has started on port 5000");
});
