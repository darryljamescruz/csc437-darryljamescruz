import { useState, useEffect } from "react";
import { groceryFetcher } from "./groceryFetcher";

export function useGroceryFetch(dropdown) {
    const [groceryData, setGroceryData] = useState([]); // Store fetched groceries
    const [isLoading, setIsLoading] = useState(false);  // Track loading state
    const [error, setError] = useState(null);           // Store error messages

    // useEffect to fetch data every time 'dropdown' changes.
    useEffect(() => {
        let isStale = false; // flag for stale requests
        
        // function to fetch groecery data
        async function fetchData(source) {
            console.log("Fetching grocery data from", source);

            // Clear previous state at the beginning of the request
            setIsLoading(true); 
            setError(null);    
            setGroceryData([]);

            try {
                const data = await groceryFetcher.fetch(dropdown);
                // only update state if request is still valid
                if (!isStale) {
                    setGroceryData(data); 
                }
            } catch (err) {
                if (!isStale) {
                setError(err.message); // Set error message
                }
            } finally {
                if (!isStale) {
                    setIsLoading(false); // Stop loading
                }
            }
    }
    fetchData();

    // cleanup func to mark request as stale
    return () => {
        isStale = true;
    };
    }, [dropdown])

    return { groceryData, isLoading, error };
}