import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { useImageFetching } from "./images/useImageFetching"; //import hook

import { Homepage } from "./Homepage";
import { AccountSettings } from "./AccountSettings";
import { ImageGallery } from "./images/ImageGallery.jsx";
import { ImageDetails } from "./images/ImageDetails.jsx";
import { ProtectedRoute } from "./ProtectedRoute.jsx";
import { MainLayout } from "./MainLayout.jsx";

import RegisterPage  from "./auth/RegisterPage.jsx";
import LoginPage  from "./auth/LoginPage.jsx";


function App() {
    // set up state for authentication token
    const [authToken, setAuthToken] = useState(null);

    // Set up state for the account name
    //const [userName, setUserName] = useState("John Doe");

    // fetches and caches images at the top level
    const { isLoading, fetchedImages } = useImageFetching(authToken);

    //have the homepage and /account pass the state of the account name as props
    return (
        <BrowserRouter>
            <Routes>
                {/* Protected route for login */}
                <Route path="/login" element={<LoginPage setAuthToken={setAuthToken} />} />
                <Route path="/register" element={<RegisterPage />} />        
                    {/* Need to pass the authToken to the protected route */}
                    <Route 
                        path="/" 
                        element={ 
                            <ProtectedRoute authToken={authToken}>
                                <MainLayout />
                            </ProtectedRoute>
                        }
                    >
                    <Route index element={<Homepage userName={authToken && "User"}/>}/>
                    <Route path="account" element={<AccountSettings userName={authToken && "User"} setUserName={() => {}} /> } />
                    <Route path="images" element={<ImageGallery isLoading={isLoading} fetchedImages={fetchedImages}/>} />
                    <Route path="images/:imageId" element={<ImageDetails/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
