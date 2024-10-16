import config from './config.js';

const { API_KEY, API_URL } = config;

const Spotify = {
    clientId: API_KEY,
    redirectUri: API_URL
}

export default Spotify;