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
        if (result) {
            return result;
        }
        console.log("Registration successful. Navigating to Login Page.");    
        Navigate('/login');
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
