export async function sendFileUploadRequest(url, formData, authToken) {
    try {
        const response = await fetch("/api/images", {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        if (!response.ok) {
            const errorText = await response.text();
            let errorMessage = "Upload failed";
            try {
                const errorData = JSON.parse(errorText);
                errorMessage = errorData.message || errorMessage;
            } catch (e) {
                console.error("Failed to parse error response", e);
            }
            throw new Error(errorMessage);
        }
        // parse response as json if successful
        const text =  await response.text();
        return text ? JSON.parse(text) : null;
    } catch (error) { // Network error
        console.error("Error uploading file:", error);
        return "An error occurred while uploading: " + error.message;
    }
}