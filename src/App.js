import React, { useState, useEffect } from 'react';
import './App.css';
import TextInput from './components/TextInput/TextInput.js';
import SearchResultsList from './components/SearchResultsList/SearchResultsList.js';
import TextInputButton from './components/TextInputButton/TextInputButton.js';
import Playlist from './components/Playlist/Playlist.js';
import { checkLoginStatus, loginWithSpotify, logoutClick, searchSpotify, savePlaylist, getUserData, refreshToken } from './utilities/Spotify.js';

function App() {
  // Search
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchButtonClickHandler = async () => setSearchResults(await searchSpotify(searchTerm));
  const searchKeyDownHandler = e => {
    if (e.key === 'Enter') searchButtonClickHandler()
  };

  // Login
  const [loggedIn, setLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const loginClickHandler = async () => setUserDetails(await loginWithSpotify);
  useEffect(() => { 
    setLoggedIn(checkLoginStatus()) 
    // console.log(loggedIn)
    // console.log(localStorage.getItem('access_token'))
    // console.log(localStorage.getItem('expires'))
  }, [loggedIn])
  useEffect(() => {    
    if (!loggedIn) return;
    if (loggedIn && new Date(localStorage.getItem('expires')).getTime() <= new Date().getTime()) {
      refreshToken();
      setTokenRefresh(localStorage.getItem('expires'));
    }
    const getDetails = async () => setUserDetails(await getUserData());
    getDetails();
  }, [loggedIn]);


  // Token
  const [tokenRefresh, setTokenRefresh] = useState(null);
  useEffect(() => {
    const timeout = setTimeout(() => {
      refreshToken();
      setTokenRefresh(localStorage.getItem('expires'));
    }, localStorage.getItem('refresh_in'));
    return () => clearTimeout(timeout);
  }, [tokenRefresh]);

  // Playlist
  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState('');  
  const savePlaylistButtonClickHandler = async () => await savePlaylist(playlistName, playlist.map(track => track['uri']));
  const updatePlaylistHandler = (details) => {
    if(playlist.find((e) => e.trackId === details.trackId)) {
      return setPlaylist(playlist.filter(e => e.trackId !== details.trackId));
    }
    return setPlaylist([...playlist, details]);
  }
  
  return (
    <div className='App'>
      <header className='App-header'>
        { 
          !loggedIn 
            ? <button onClick={loginClickHandler}>Login</button>
            : <>
                <strong>{userDetails['id']}</strong>                
                <button onClick={logoutClick}>Logout</button>
                <div className='flex-container'>
                  <TextInput 
                    value={searchTerm} 
                    onChange={e =>  setSearchTerm(e.target.value)} 
                    onKeyDown={searchKeyDownHandler} 
                    />
                  <TextInputButton onClick={searchButtonClickHandler} buttonText="Search"/>
                </div>
                <div className='flex-container'>
                  <TextInput value={playlistName} onChange={e => setPlaylistName(e.target.value)}/>
                  <TextInputButton onClick={savePlaylistButtonClickHandler} buttonText="Save Playlist"/>
                </div>
                <div className='flex-container'>
                  <SearchResultsList playlist={playlist} results={searchResults} updatePlaylist={updatePlaylistHandler}/>
                  <Playlist playlist={playlist} updatePlaylist={updatePlaylistHandler}/>
                </div>
              </>    
        }
      </header>
    </div>
  );
}

export default App;
