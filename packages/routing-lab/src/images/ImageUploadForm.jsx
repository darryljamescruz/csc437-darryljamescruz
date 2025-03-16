import React, { useState, useId } from "react";

export function ImageUploadForm() {
    const fileinputId = useId();    // useID hook to generate unique ID for file input
    const [previewURL, setPreviewURL] = useState("");   // useState hook to manage preview URL

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

    return (
        <form>
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
                    <input name="name" />
                </label>
            </div>

            <div> {/* Preview img element */}
                <img style={{maxWidth: "20em"}} src={"GIVE ME A DATA URL"} alt="" />
            </div>

            <button>Confirm upload</button>
        </form>
    );
}