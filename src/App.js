import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar.js';
import SearchResultsList from './components/SearchResultsList/SearchResultsList.js';
import SearchButton from './components/SubmitButton/SubmitButton.js';
import Playlist from './components/Playlist/Playlist.js';
import { reqUserAuth, parseAuthCode, testRefresh, searchSpotify } from './utilities/Spotify.js';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [authorisation, setAuthorisation] = useState(null);
  const [accessCode, setAccessCode] = useState('');
  const [playlist, setPlaylist] = useState([
    "6nJPHXRpKYv2yqtalEjKy5",
    "1pr9TZGOXeJUggIal1Wq3R",
    "6W21LNLz9Sw7sUSNWMSHRu",
    "1AzMYJm6qTAullM3UKuPY9"
  ]);

  const searchButtonClickHandler = async () => {
    setSearchResults(await searchSpotify(searchTerm));
  };

  useEffect(() => {
    const args = new URLSearchParams(window.location.search);
    const code = args.get('code');
    setAuthorisation(code);
  });

  useEffect(() => {
    const getAccessCode = async () => await parseAuthCode(authorisation);
    getAccessCode().then(code => setAccessCode(code));
  },[authorisation]);
  
  const updatePlaylistHandler = (id) => {
    if(playlist.find((e) => e === id)) {
      return setPlaylist(playlist.filter(e => e !== id));
    }

    setPlaylist([...playlist, id]);
  }

  return (
    <div className='App'>
      <header className='App-header'>
        { 
          !accessCode 
            ? <button onClick={reqUserAuth}>Login</button>
            : <>
                <button onClick={testRefresh}>TEST</button>
                <SearchBar value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
                <SearchButton onClick={searchButtonClickHandler}/>
                <SearchResultsList results={searchResults} updatePlaylist={updatePlaylistHandler}/>
                <Playlist playlist={playlist} updatePlaylist={updatePlaylistHandler}/>
              </>    
        }
      </header>
    </div>
  );
}

export default App;
