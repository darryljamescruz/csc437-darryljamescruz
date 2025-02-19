// src/App.jsx
import { useState } from "react";
import { nanoid } from "nanoid";
import TodoItem from "./TodoItem";
import AddTaskForm from "./AddTaskForm";

function App() {
  const [tasks, setTasks] = useState([
    { id: nanoid(), name: "Eat", completed: false },
    { id: nanoid(), name: "Sleep", completed: false },
    { id: nanoid(), name: "Repeat", completed: false },
  ]);

  // Function to handle adding a new task
  const handleAddTask = (taskName) => {
    if (!taskName.trim()) { // Check if the task name is empty
      return;
    }

    const newTask = {
      id: nanoid(),
      name: taskName,
      completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);  // Add the new task to the tasks array
  };

  // Function to handle deleting a task
  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));  // Remove the task with the given ID
  };

  const handleToggleTask = (taskId) => {
    setTasks((prevTasks) =>
    prevTasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    )
  );
  };

  return (
    <main className="m-4">
      <AddTaskForm onNewTask={handleAddTask} />  
      <section>
        <h1 className="text-xl font-bold mt-4">To do</h1>
        <ul>
          {tasks.map((task) => (
            <TodoItem 
              key={task.id} 
              task={task} 
              onToggle={() => handleToggleTask(task.id)}
              onDelete={() => handleDeleteTask(task.id)} 
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;