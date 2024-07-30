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

const getAnalyze = async (token_address1, token_address2) => {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
        },
        body: JSON.stringify({ token_address1, token_address2 })
    };

    const response = await fetch(`${API_BASE}/analyze/get_crossover_holder_list`, requestOptions);
    return await handleResponse(response);
}

const getWalletAnalyze = async (wallet_address) => {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
        },
        body: JSON.stringify({ wallet_address })
    };

    const response = await fetch(`${API_BASE}/analyze/get_wallet_analyze_result`, requestOptions);
    return await handleResponse(response);
}

export const analyzeService = {
    getAnalyzeOverview,
    getAnalyze,
    getWalletAnalyze
}