import { Homepage } from "./Homepage";
import { AccountSettings } from "./AccountSettings";
import { ImageGallery } from "./images/ImageGallery.jsx";
import { ImageDetails } from "./images/ImageDetails.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import React, { useState } from "react";


function App() {
    // Set up state for the account name
    const [userName, setUserName] = useState("John Doe");

    //have the homepage and /account pass the state of the account name as props
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage userName={userName}/>}/>
                <Route path="/account" element={<AccountSettings userName={userName} setUserName={setUserName} /> } />
                <Route path="/images" element={<ImageGallery/>} />
                <Route path="/images/:imageId" element={<ImageDetails/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
