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
        const responseText = await response.text();
        console.log('Response text:', responseText);

        if (!response.ok) {
            let errorMessage = 'Request Failed';
            try {
                const errorData = JSON.parse(responseText);
                errorMessage = errorData.message || errorMessage;
            } catch (e) {
                console.error('Error parsing error response:', e);
            }
            throw new Error(errorMessage);
        }
        if (!responseText) {
            return '';  // return empty string on success when no content
        } else {
            return JSON.parse(responseText);
        }
    } catch (error) {
        console.error('Error in sendPostRequest:', error);
        return "An error occurred while sending the request: " + error.message;
    }
}