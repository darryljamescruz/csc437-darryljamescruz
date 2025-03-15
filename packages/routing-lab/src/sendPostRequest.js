export async function sendPostRequest(url, payload) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify(payload),
        });
        console.log('Response status:', response.status);
        // Optionally log response body if needed:
        const responseText = await response.text();
        console.log('Response text:', responseText);

        if (!response.ok) {
           let errorMessage = 'Request Failed';
            // Try to parse the response text as JSON
            // and extract the error message if available
           try {
                const errorData = JSON.parse(responseText);
                errorMessage = errorData.message || errorMessage;
           } catch (e) {
                console.error('Error parsing error response:', e);
           }
           throw new Error(errorMessage);
        }
        if (!responseText) {
            return '';  // return empty string on success
        }
    } catch (error) {
        console.error('Error in sendPostRequest:', error);
        return "An error occurred while sending the request: " + error.message;
    }
}