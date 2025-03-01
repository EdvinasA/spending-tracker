import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const apiFetch = async <T>(endpoint: string, method: string = "GET", body?: any): Promise<T> => {
    try {
        
        const token = Cookies.get('token');
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token || ""}`,
            },
            body: body ? JSON.stringify(body) : undefined,
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.error("API Fetch Error:", error);
        throw error;
    }
};