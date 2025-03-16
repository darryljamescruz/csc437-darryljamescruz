import React, { useID } from "react";

export function ImageUploadForm() {
    const fileinputId = useID();


    return (
        <form>
            <div>
                <label htmlFor={fileinputId}>Choose image to upload: </label>
                <input
                    id={fileinputId}
                    name="image"
                    type="file"
                    accept=".png,.jpg,.jpeg"
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