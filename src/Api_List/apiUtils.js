import axios from 'axios';

export async function apiRequest({ url, method = 'GET', body = {}, token = '' }) {
  try {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const config = {
      url,
      method,
      headers,
    };

    if (method === 'GET') {
      config.params = body; // send as query params
    } else {
      config.data = body; // send as request body
    }

    const response = await axios(config);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || error.message || 'Unknown error',
    };
  }
}
