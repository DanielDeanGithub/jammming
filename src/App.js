import React, { useState, useEffect } from 'react';
import './App.css';
import TextInput from './components/TextInput/TextInput.js';
import SearchResultsList from './components/SearchResultsList/SearchResultsList.js';
import TextInputButton from './components/TextInputButton/TextInputButton.js';
import Playlist from './components/Playlist/Playlist.js';
import { checkLoginStatus, loginWithSpotify, logoutClick, searchSpotify, savePlaylist } from './utilities/Spotify.js';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [accessCode, setAccessCode] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState('');

  useEffect(() => setAccessCode(checkLoginStatus()))
  
  const searchButtonClickHandler = async () => setSearchResults(await searchSpotify(searchTerm));
  const savePlaylistButtonClickHandler = async () => await savePlaylist(playlistName, playlist.map(track => track['uri']));
  const searchKeyDownHandler = e => {
    if (e.key === 'Enter') searchButtonClickHandler()
  }
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
          !accessCode 
            ? <button onClick={loginWithSpotify}>Login</button>
            : <>
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
