import { MainLayout } from "./MainLayout.jsx";

export function Homepage({userName}) {
    console.log("Homepage userName:", userName);
    return (
        <MainLayout>
            <h2>Welcome, {userName}</h2>
            <p>This is the content of the home page.</p>
        </MainLayout>
    );
}
