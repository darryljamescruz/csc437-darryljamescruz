import React from 'react';
import { Link } from 'react-router-dom';
import UsernamePasswordForm from './UsernamePasswordForm';
import { sendPostRequest } from '../sendPostRequest';

export default function LoginPage() {
  const handleSubmit = async ({ username, password }) => {
    console.log("Logging in with username:", username);
    const result = await sendPostRequest('/auth/login', { username, password });

    // if result is non-empty string, it means an error occurred
    if (typeof result === 'string' && result !== '') {
      return result;
    } else if (result.token) {
      // Handle successful login, e.g., store token, redirect, etc.
      console.log('Login successful:', result.token);
      return '';
    } else {
      return 'Unexpected error occured';
    }

  };

  return (
    <div>
      <h1>Login</h1>
      <UsernamePasswordForm onSubmit={handleSubmit} />
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}