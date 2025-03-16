import React from 'react';
import { useNavigate } from 'react-router-dom';
import UsernamePasswordForm from './UsernamePasswordForm';
import { sendPostRequest } from '../sendPostRequest'

export default function RegisterPage() {
    const Navigate = useNavigate();

    // handle form submission using async function 
    const handleSubmit = async ({ username, password}) => {
        console.log('Register Form submitted with username:', username);

        // send a POST request to the server to register the user
        const result = await sendPostRequest('/auth/register', { username, password });

        // if result is non-empty string, it means an error occurred
        if (typeof result === 'string' && result !== '') {
            return result;
        }
        
        // check if the result contains a token
        if (result && result.token) {
            console.log('Registration successful:', result.token);
            Navigate('/')   // navigate to the homepage
        } else {
            console.log('Registration was successful, but no token was returned. Navigating to login page.');
            Navigate('/login'); // navigate to the login page
        }
        return '';
    };

    return (
        <div>
            <h1>Register</h1>
            {/* Using the UsernamePasswordForm component */}
            <UsernamePasswordForm onSubmit={handleSubmit} />
        </div>
    );
}
