import { MainLayout } from "./MainLayout.jsx";

export function Homepage({userName}) {
    console.log("Homepage userName:", userName);
    //rendering page using DIV instead of MainLayout
    return (
        <div>
            <h2>Welcome, {userName}</h2>
            <p>This is the content of the home page.</p>
        </div>
    );
}
