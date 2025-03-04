import { MainLayout } from "./MainLayout.jsx";
import React from "react";

export function AccountSettings({userName, setUserName}) {
    // handler to update account name when the input changes
    const handleInputChange = (event) => {
        console.log("New username:", event.target.value);
        setUserName(event.target.value);
    };

    return (
        <MainLayout>
            <h2>Account settings</h2>
            <label htmlFor="userName">User Name: </label>
            <input
                id="userName"
                type="text"
                value={userName}
                onChange={handleInputChange}
            />
            <p><i>Changes are auto-saved.</i></p>
        </MainLayout>
    );
}
