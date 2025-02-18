// src/App.jsx
import { useState } from "react";
import TodoItem from "./TodoItem";
import AddTaskForm from "./AddTaskForm";

function App() {
  const [tasks, setTasks] = useState(["Eat", "Sleep", "Repeat"]);

  const handleAddTask = () => {
    // For now, this is just a placeholder.
    // Later, you'll update the tasks state to add a new task.
    console.log("Add task clicked!");
  };

  const handleDeleteTask = (taskToDelete) => {
    // Placeholder for deleting a task.
    // In a later lab, you'll update the tasks state to remove the task.
    console.log("Delete", taskToDelete);
  };

  return (
    <main className="m-4">
      <AddTaskForm onAdd={handleAddTask} />
      <section>
        <h1 className="text-xl font-bold mt-4">To do</h1>
        <ul>
          {tasks.map((task, index) => (
            <TodoItem 
              key={index} 
              task={task} 
              onDelete={() => handleDeleteTask(task)} 
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;