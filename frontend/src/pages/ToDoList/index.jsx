import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ToDoForm from "../../components/ToDoForm";
import ToDoItem from "../../components/ToDoItem";
import "./styles.css";
import { createTask, deleteTask, getTasks, updateTask } from "../../api/task";
import { AuthContext } from "../../auth/Context";
import { toast } from "react-toastify";

export default function ToDoList() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const { logout } = useContext(AuthContext);

  const listTasks = async () => {
    const { tasks } = await getTasks();
    setTodos(tasks);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const addTodo = async (text) => {
    const scriptTagRegex = /<script\s*.*?>.*?<\/script>/i;

    if (scriptTagRegex.test(text)) {
      toast("Ops, task inválida.");
      return;
    }
    await createTask(text);
    await listTasks();
  };

  const deleteTodo = async (id) => {
    await deleteTask(id);
    await listTasks();
  };

  const updateTodo = async (id, newText) => {
    await updateTask(id, newText);
    await listTasks();
  };

  useEffect(() => {
    listTasks();
  }, []);

  return (
    <div className="todo-app">
      <h1>To-Do List</h1>
      <ToDoForm addTodo={addTodo} />
      <div className="todo-list">
        {todos.map((todo) => (
          <ToDoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        ))}
      </div>
      <div>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
}
