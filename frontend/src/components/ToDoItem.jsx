import React, { useState } from "react";

function ToDoItem({ todo, toggleComplete, deleteTodo, updateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.description);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (newText.trim()) {
      updateTodo(todo.id, newText);
      setIsEditing(false);
    }
  };

  return (
    <div className={`todo-item`}>
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="edit-input"
          />
          <button type="submit" className="save-btn">
            Save
          </button>
        </form>
      ) : (
        <>
          <div className="todo-text" onClick={() => toggleComplete(todo.id)}>
            {todo.description}
          </div>
          <div className="todo-actions">
            <button onClick={() => setIsEditing(true)} className="edit-btn">
              Edit
            </button>
            <button onClick={() => deleteTodo(todo.id)} className="delete-btn">
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ToDoItem;
