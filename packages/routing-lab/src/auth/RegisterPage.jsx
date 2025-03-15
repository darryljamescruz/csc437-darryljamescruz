import React from 'react';
import UsernamePasswordForm from './UsernamePasswordForm';
import { sendPostRequest } from '../sendPostRequest'

export default function RegisterPage() {
    // handle form submission using async function 
    const handleSubmit = async ({ username, password}) => {
        console.log('Register Form submitted with username:', username);

        // send a POST request to the server to register the user
        const result = await sendPostRequest('/auth/register', { username, password });
        if (result) {
            return result;
        }
        console.log("Registration successful");    
    };

    return (
        <div>
            <h1>Register</h1>
            {/* Using the UsernamePasswordForm component */}
            <UsernamePasswordForm onSubmit={handleSubmit} />
        </div>
    );
}
