// src/App.jsx
import { useState } from "react";
import { nanoid } from "nanoid";

import TodoItem from "./TodoItem";
import AddTaskForm from "./AddTaskForm";
import Modal from "./Modal"; 


function App() {
  const [tasks, setTasks] = useState([
    { id: nanoid(), name: "Eat", completed: false },
    { id: nanoid(), name: "Sleep", completed: false },
    { id: nanoid(), name: "Repeat", completed: false },
  ]); // Initial tasks

  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal state


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
    setIsModalOpen(false); // Close the modal after adding the task
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
      {/* Button to Open Modal */}
      <button
        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={() => setIsModalOpen(true)}
      >
        Add Task
      </button>

      {/* Modal for Adding a Task */}
      <Modal
        isOpen={isModalOpen}
        onCloseRequested={() => setIsModalOpen(false)}
        headerLabel="Add New Task"
      >
        <AddTaskForm onNewTask={handleAddTask} />
      </Modal>

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