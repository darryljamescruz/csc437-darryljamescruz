import React from "react";
import { Header } from "./Header";
import { Outlet } from "react-router"

export function MainLayout() {
    //console.log("MainLayout rendered");
    return (
        <div>
            <Header />
            <Outlet/>
        </div>
    );
}
