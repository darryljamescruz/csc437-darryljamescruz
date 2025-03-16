import React from "react";

export function AccountSettings({userName, setUserName}) {
    // handler to update account name when the input changes
    const handleInputChange = (event) => {
        console.log("New username:", event.target.value);
        setUserName(event.target.value);
    };
    //rendering page using DIV instead of MainLayout

    return (
        <div>
            <h2>Account settings</h2>
            <label htmlFor="userName">User Name: </label>
            <input
                id="userName"
                type="text"
                value={userName}
                onChange={handleInputChange}
            />
            <p><i>Changes are auto-saved.</i></p>
        </div>
    );
}
