const clientId = process.env.REACT_APP_API_KEY;
const redirectUrl = process.env.REACT_APP_API_URL;

const authorizationEndpoint = "https://accounts.spotify.com/authorize";
const tokenEndpoint = "https://accounts.spotify.com/api/token";
const scope = 'user-read-private user-read-email playlist-modify-public';

// Manages current active token, caching it in localStorage
const currentToken = {
    get access_token() { return localStorage.getItem('access_token') || null; },
    get refresh_token() { return localStorage.getItem('refresh_token') || null; },
    get expires_in() { return localStorage.getItem('refresh_in') || null },
    get expires() { return localStorage.getItem('expires') || null },

    save: function (response) {
        const { access_token, refresh_token, expires_in } = response;
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        localStorage.setItem('expires_in', expires_in);

        const now = new Date();
        const expiry = new Date(now.getTime() + (expires_in * 1000));
        localStorage.setItem('expires', expiry);
    }
};

// On page load, try fetching auth code from current browser search URL
const args = new URLSearchParams(window.location.search);
const code = args.get('code');

// If code found do a token exchange
if (code) {
    const token = await getToken(code);
    currentToken.save(token);

    // Remove code from URL so we can refresh correctly.
    const url = new URL(window.location.href);
    url.searchParams.delete("code");

    const updatedUrl = url.search ? url.href : url.href.replace('?', '');
    window.history.replaceState({}, document.title, updatedUrl);
}

export const checkLoginStatus = () => currentToken.access_token !== null;


async function redirectToSpotifyAuthorize() {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const randomValues = crypto.getRandomValues(new Uint8Array(64));
    const randomString = randomValues.reduce((acc, x) => acc + possible[x % possible.length], "");

    const code_verifier = randomString;
    const data = new TextEncoder().encode(code_verifier);
    const hashed = await crypto.subtle.digest('SHA-256', data);

    const code_challenge_base64 = btoa(String.fromCharCode(...new Uint8Array(hashed)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');

    window.localStorage.setItem('code_verifier', code_verifier);

    const authUrl = new URL(authorizationEndpoint)
    const params = {
        response_type: 'code',
        client_id: clientId,
        scope: scope,
        code_challenge_method: 'S256',
        code_challenge: code_challenge_base64,
        redirect_uri: redirectUrl,
    };

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString(); // Redirect the user to the authorization server for login
}

// Soptify API Calls
async function getToken(code) {
    const code_verifier = localStorage.getItem('code_verifier');
  
    const response = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUrl,
        code_verifier: code_verifier,
      }),
    });
  
    return await response.json();
}
  
async function refreshToken() {
    const response = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: 'refresh_token',
        refresh_token: currentToken.refresh_token
      }),
    });
  
    return await response.json();
}
  
export async function getUserData() {
    const response = await fetch("https://api.spotify.com/v1/me", {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + currentToken.access_token },
    });
  
    return await response.json();
}
  
// Click handlers
export async function loginWithSpotify() {
    await redirectToSpotifyAuthorize();
}
  
export async function logoutClick() {
    localStorage.clear();
    window.location.href = redirectUrl;
}
  
export async function refreshTokenClick() {
    console.log(currentToken.access_token);
    
    const token = await refreshToken();
    currentToken.save(token);
    console.log(currentToken.access_token);

    //renderTemplate("oauth", "oauth-template", currentToken);
}
  
export const searchSpotify = async (userInput) => {
    if (!userInput) return [];
    
    const accessToken = currentToken.access_token;
    const url = `https://api.spotify.com/v1/search?q=${userInput}&type=artist,album,track&market=GB&limit=10`;
    const headers = { Authorization: `Bearer ${accessToken}` };
    
    const requiredDetails = [];
    await fetch(url, {
            method: "GET", headers: headers
        })
        .then(response => response.json())
        .then(fullDetails => {
            fullDetails['tracks']['items'].forEach(track => {
                requiredDetails.push({
                    trackId: track['id'],
                    trackName: track['name'],
                    artists: track['artists'].map(artist => artist['name']).join(', '),
                    albumName: track['album']['name'],
                    albumArtwork: track['album']['images'][0]['url'],
                    preview: track['preview_url'],
                    uri: track['uri']
                });
            });
        })
    
    return requiredDetails;
}

export const savePlaylist = async (name, trackUris) => {
    if (!name || !trackUris.length) return;

    const accessToken = currentToken.access_token;
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    return fetch('https://api.spotify.com/v1/me', {headers: headers})
        .then(response => response.json())
        .then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({name: name})
            })
        .then(response => response.json())
        .then(jsonResponse => {
            const playlistId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({uris: trackUris})
            });
        });
    });
}
