import { Link } from "react-router";
import { ImageUploadForm } from "./ImageUploadForm";
import "./ImageGallery.css";

// uses isLoading, fetchedImages props from App.jsx
export function ImageGallery({ isLoading, fetchedImages, authToken }) {
    const imageElements = fetchedImages.map((image) => (
        <div key={image.id} className="ImageGallery-photo-container">
            <Link to={`${image.id}`}>               
                <img src={image.src} alt={image.name}/>
            </Link>
        </div>
    ));
    return (
        <div>
            <h2>Image Gallery</h2>
            {isLoading && "Loading..."}
            <div className="ImageGallery">
                {imageElements}
            </div>
            <h3>Upload an Image</h3>
            <ImageUploadForm authToken={authToken} />
        </div>
    );
}