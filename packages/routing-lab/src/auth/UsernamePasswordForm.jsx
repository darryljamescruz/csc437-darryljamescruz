import React, { useState } from 'react';

export default function UsernamePasswordForm({ onSubmit }) {
    const [result, setResult] = useState(null);         // to store the result of the form submission
    const [isPending, setIsPending] = useState(false);  // to indicate if the form is being submitted

    // handle form submission 
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const username = formData.get('username')?.toString().trim();
        const password = formData.get('password')?.toString().trim();

        //console.log('Form submitted with username:', username, 'and password:', password)

        // missing field validation
        if (!username || !password) {
            setResult('Please fill in your username and password');
            return;
        }

        setResult(null);
        setIsPending(true)

        try {
            //pass form data onto onSubmit prop, which should return a result
            const submitResult = await onSubmit({ username, password });
            setResult(submitResult);
        } catch (error) {
            setResult(error);
        } finally {
            setIsPending(false);
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
          {/* Display error or status messages */}
          {result && <p style={{ color: 'red' }}>{result}</p>}
          <div>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username"
              type="text"
              disabled={isPending}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              name="password"
              type="password"
              disabled={isPending}
            />
          </div>
          <button type="submit" disabled={isPending}>
            Submit
          </button>
        </form>
      );
    }