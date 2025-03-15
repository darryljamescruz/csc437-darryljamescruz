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
            const errorData = await response.json();
            throw new Error(errorData.message || 'Request failed');
        }
        return '';  // return empty string on success
    } catch (error) {
        console.error('Error in sendPostRequest:', error);
        return "An error occurred while sending the request: " + error.message;
    }
}