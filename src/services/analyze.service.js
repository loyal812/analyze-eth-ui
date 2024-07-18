import { handleResponse } from '../utils';
import { API_BASE } from '../config/constants';


const getAnalyzeOverview = async () => {
    const requestOptions = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
        },
    };

    const response = fetch(`${API_BASE}/analyze/get_analyze_overview`, requestOptions);
    return await handleResponse(response);
}

export const analyzeService = {
    getAnalyzeOverview
}