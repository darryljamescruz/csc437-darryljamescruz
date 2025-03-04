import { useParams } from "react-router";
import { MainLayout } from "../MainLayout";

export function ImageDetails() {
    // Extract the imageId from the URL parameters
    const { imageId } = useParams();
    console.log("Current imageId:", imageId); // prints the image id from the URL

    return (
        <div>
            <h2>Image Details</h2>
            <p>Displaying details for image: {imageId}</p>
        </div>
    );
}