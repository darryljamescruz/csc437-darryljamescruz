import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { useImageFetching } from "./images/useImageFetching"; //import hook

import { Homepage } from "./Homepage";
import { AccountSettings } from "./AccountSettings";
import { ImageGallery } from "./images/ImageGallery.jsx";
import { ImageDetails } from "./images/ImageDetails.jsx";
import { MainLayout } from "./MainLayout.jsx";

import RegisterPage  from "./auth/RegisterPage.jsx";
import LoginPage  from "./auth/LoginPage.jsx";


function App() {
    // Set up state for the account name
    const [userName, setUserName] = useState("John Doe");
    // fetches and caches images at the top level
    const { isLoading, fetchedImages } = useImageFetching("");

    //have the homepage and /account pass the state of the account name as props
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                {/* Main layout for the app */}
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Homepage userName={userName}/>}/>
                    <Route path="account" element={<AccountSettings userName={userName} setUserName={setUserName} /> } />
                    <Route path="images" element={<ImageGallery isLoading={isLoading} fetchedImages={fetchedImages}/>} />
                    <Route path="images/:imageId" element={<ImageDetails/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
