import fetch from 'node-fetch';
import 'dotenv/config';

const BASE_URL = 'https://api.servicem8.com/api_1.0';

// Helper to get Authorization header
export const getAuthHeader = () => {
  const apiKey = process.env.SERVICEM8_API_KEY;
  if (!apiKey) throw new Error('ServiceM8 API key is missing in .env');

  // Basic Auth: Base64 encode API_KEY with colon
  const token = Buffer.from(`${apiKey}:`).toString('base64');
  return `Basic ${token}`;
};

// Fetch jobs from ServiceM8
export const fetchJobs = async () => {
  const authHeader = getAuthHeader();

  try {
    const response = await fetch(`${BASE_URL}/job.json`, {
      method: 'GET',
      headers: {
        'Authorization': authHeader,
        'Accept': 'application/json',
      },
    });

    if (response.status === 401) {
      console.error('ServiceM8 Fetch Error: 401 Unauthorized');
      console.error('Check that your API key is correct and has proper permissions.');
      throw new Error('ServiceM8 API Error: 401 Unauthorized');
    }

    if (!response.ok) {
      const text = await response.text();
      console.error(`ServiceM8 Fetch Error: ${response.status} ${response.statusText}`, text);
      throw new Error(`ServiceM8 API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('ServiceM8 Fetch Error:', err.message || err);
    throw err;
  }
};
