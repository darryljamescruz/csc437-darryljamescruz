// src/AddTaskForm.jsx
import { useState } from "react";

function AddTaskForm({ onNewTask }) {
    const [taskName, setTaskName] = useState(""); // State to hold the new task name

    // Function to handle adding a new task
    const handleAddTask = () => {
      if (!taskName.trim()) { // Check if the task name is empty
        return;
      }
      onNewTask(taskName); // Call the parent function to add the new task
      setTaskName(""); // Clear the input field
    };

    // Function to handle pressing Enter key
    const handleSubmit = (e) => {
      e.preventDefault();
      handleAddTask(); // Call the function to add the task
    };
  
    return (
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        {/* Task Input & Button Wrapper */}
        <div className="flex items-center space-x-4">
          <input 
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)} // Update state on input change
            placeholder="New task name" 
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />             
          <button 
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={handleAddTask} // Use handleAddTask function
          >
            Add task
          </button>
        </div>
      </form>
    );
}

export default AddTaskForm;