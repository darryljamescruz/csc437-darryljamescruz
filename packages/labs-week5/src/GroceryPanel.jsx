import React from "react";
import { useState } from "react";
import { groceryFetcher } from "./groceryFetcher"

const MDN_URL = "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json";

/**
 * Creates and returns a new promise that resolves after a specified number of milliseconds.
 *
 * @param {number} ms the number of milliseconds to delay
 * @returns {Promise<undefined>} a promise that resolves with the value of `undefined` after the specified delay
 */
function delayMs(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function GroceryPanel({ onAddTask }){
    const [groceryData, setGroceryData] = useState([]); // Store fetched groceries
    const [isLoading, setIsLoading] = useState(false);  // Track loading state
    const [error, setError] = useState(null);           // Store error messages
    const [dropdown, setDropdown] = useState("MDN");    // Track selected grocery source


    // function to fetch groecery data
    async function fetchData(source) {
        console.log("Fetching grocery data from", source);

        setIsLoading(true); // Set loading state to true
        setError(null);    // Reset error state
        setGroceryData([]); // Reset grocery data

        try {
            const data = await groceryFetcher.fetch(source);
            setGroceryData(data); // Set fetched data directly
        } catch (err) {
            setError(err.message); // Set error message
        } finally {
            setIsLoading(false); // Stop loading
        }
    }

    // handle dropdown selection
    function handleDropdownChange(event) {
        const newDropdown = event.target.value;
        setDropdown(newDropdown);
        if (newDropdown === "") {
            setGroceryData([]); // Reset grocery data if no URL is selected
        } else {
            fetchData(newDropdown); // Fetch data from selected source
        }
    }
    
    // handle add todo button click
    function handleAddTodoClicked(item) {
        const todoName = `Buy ${item.name} (${item.price.toFixed(2)})`;
        if (onAddTask) {  
            onAddTask(todoName);
        } else {
            console.error("onAddTask is not defined");
        }   
    }

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Groceries Prices Today</h1>

            {/* Dropdown Menu */}
            <div className="flex items-center gap-4 mb-4">
                <label className="text-gray-700 font-medium">Get prices from:</label>
                <select
                    onChange={handleDropdownChange}
                    disabled={isLoading}
                    className="border border-gray-300 p-2 rounded-md text-gray-700 disabled:opacity-50"
                    value={dropdown} 
                >
                    <option value="">(None selected)</option>
                    <option value="MDN">MDN</option>
                    <option value="Liquor store">Liquor store</option>
                    <option value="Butcher">Butcher</option>
                    <option value="whoknows">Who knows?</option>
                </select>

                {/* Show Spinner While Loading */}
                {isLoading && <div className="w-5 h-5 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>}

                {/* Show Error Message if Fetch Fails */}
                {error && <span className="text-red-500 font-medium">{error}</span>}
            </div>

            {/* Grocery Price Table */}
            {groceryData.length > 0 ? (
                <PriceTable items={groceryData} onAddClicked={handleAddTodoClicked} />
            ) : (
                !isLoading && !error && <p className="text-gray-500 text-sm">No data available.</p>
            )}
        </div>
    );
}

// Component to render grocery data in a table
function PriceTable({ items, onAddClicked }) {
    return (
        <table className="w-full border border-gray-200 rounded-md overflow-hidden">
            <thead>
                <tr className="bg-gray-200 text-gray-700">
                    <th className="text-left px-4 py-3 border-b">Name</th>
                    <th className="px-4 py-3 border-b">Price</th>
                    <th className="px-4 py-3 border-b">Action</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item) => (
                    <PriceTableRow key={item.name} item={item} onAddClicked={() => onAddClicked(item)} />
                ))}
            </tbody>
        </table>
    );
}

// Component to render each grocery item row
function PriceTableRow({ item, onAddClicked }) {
    return (
        <tr className="border-b hover:bg-gray-100 transition">
            <td className="px-4 py-3">{item.name}</td>
            <td className="px-4 py-3 text-center">${item.price.toFixed(2)}</td>
            <td className="px-4 py-3 text-center">
                <button
                    className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition"
                    onClick={onAddClicked}
                >
                    Add to todos
                </button>
            </td>
        </tr>
    );
}
// Export the component
export default GroceryPanel;