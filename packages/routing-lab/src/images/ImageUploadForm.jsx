import React, { useState, useId } from "react";
import { sendFileUploadRequest } from "../sendFileUploadRequest";

export function ImageUploadForm({authToken}) {
    const fileinputId = useId();    // useID hook to generate unique ID for file input
    const [previewURL, setPreviewURL] = useState(null);   // useState hook to manage preview URL

    // function to read a file as a data URL
    function readAsDataURL(file) {
        return new Promise((resolve, reject) => {
            const fr = new FileReader();
            fr.onload = () => resolve(fr.result);
            fr.onerror = (err) => reject(err);
            fr.readAsDataURL(file);
        });
    }

    // file input change handler
    async function handleFileChange(e) {
        const file = e.target.files[0];
        if (file) {
            try {
                const dataURL = await readAsDataURL(file);
                setPreviewURL(dataURL);   // set preview URL 
            } catch (err) {
                console.error("Error reading file", err);
            }
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target); // create FormData object from form
        try {
            const result = await sendFileUploadRequest("/api/images", formData, authToken);
            if (typeof result === "string" && result !=="") {
                console.error("Upload error:", result)
            } else {
                console.log("Upload successful:", result);
                // clear form fields
                e.target.reset();
                setPreviewURL(null);
            }
        } catch (err) {
            console.error("Error uploading file", err);
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor={fileinputId}>Choose image to upload: </label>
                <input
                    id={fileinputId}
                    name="image"
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    onChange={handleFileChange}  // call handleFileChange on file input change
                />
            </div>
            <div>
                <label>
                    <span>Image title: </span>
                    <input name="title" />
                </label>
            </div>

            <div> {/* Preview img element */}
                {previewURL ? <img style={{maxWidth: "20em"}} src={previewURL} alt="Image Preview" /> : null}
            </div>

            <button type="submit">Confirm upload</button>
        </form>
    );
}