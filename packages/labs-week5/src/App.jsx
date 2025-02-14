import { TrashIcon } from "@heroicons/react/24/solid"; // Importing the trash icon

function App() {
  return (
      <main className="m-4"> {/* Tailwind: margin level 4 on all sides */}
        <div className="flex items-center space-x-4"> {/* Unfortunately comments in JSX have to be done like this */}
            <input placeholder="New task name" className ="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>             
            <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Add task
            </button>
        </div>

    <section>
      <h1 className="text-xl font-bold">To do</h1>
      <ul>
        <li className="flex items-center justify-between w-fit max-w-md p-2">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="w-5 h-5 accent-blue-600 rounded-md cursor-pointer" />
            <span className="text-lg">Eat</span>
          </label>
          <button className="p-2 text-red-500 rounded hover:bg-red-100">
            <TrashIcon className="w-5 h-5" />
          </button>
        </li>

        <li className="flex items-center justify-between w-fit max-w-md p-2">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="w-5 h-5 accent-blue-600 rounded-md cursor-pointer" />
            <span className="text-lg">Sleep</span>
          </label>
          <button className="p-2 text-red-500 rounded hover:bg-red-100">
            <TrashIcon className="w-5 h-5" />
          </button>
        </li>

        <li className="flex items-center justify-between w-fit max-w-md p-2">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="w-5 h-5 accent-blue-600 rounded-md cursor-pointer" />
            <span className="text-lg">Repeat</span>
          </label>
          <button className="p-2 text-red-500 rounded hover:bg-red-100">
            <TrashIcon className="w-5 h-5" />
          </button>
        </li>
      </ul>
    </section>
      </main>
  );
}

export default App;