import { Homepage } from "./Homepage";
import { AccountSettings } from "./AccountSettings";
import { ImageGallery } from "./images/ImageGallery.jsx";
import { ImageDetails } from "./images/ImageDetails.jsx";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage userName="John Doe"/>} />
                <Route path="/account" element={<AccountSettings/>} />
                <Route path="/images" element={<ImageGallery/>} />
                <Route path="/images/:imageId" element={<ImageDetails/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
