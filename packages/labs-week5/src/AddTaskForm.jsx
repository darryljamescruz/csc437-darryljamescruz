// src/AddTaskForm.jsx

function AddTaskForm({ onAdd }) {
    return (
      <div className="flex items-center space-x-4">
        <input 
          placeholder="New task name" 
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />             
        <button 
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={onAdd}
        >
          Add task
        </button>
      </div>
    );
  }
  
  export default AddTaskForm;