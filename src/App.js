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
    {
      "trackId": "05NpeTQWnzXS1d8ZqL4YFZ",
      "trackName": "Twisted Transistor",
      "artists": "Korn",
      "albumName": "See You On the Other Side",
      "albumArtwork": "https://i.scdn.co/image/ab67616d0000b27374c1560b64750a1774495144",
      "preview": "https://p.scdn.co/mp3-preview/cd0384bcafc23a0e837cf9b56b9d20232926ef02?cid=4c7acac22bee47d09ae1ad7cf23c1261"
    },
    {
      "trackId": "2F6FfZ4w8z3eJpSxPotVO5",
      "trackName": "Falling Away from Me",
      "artists": "Korn",
      "albumName": "Issues",
      "albumArtwork": "https://i.scdn.co/image/ab67616d0000b2731c229cb7c9851fb0c67e2af8",
      "preview": "https://p.scdn.co/mp3-preview/07275c56a497095ef0a987eae808f43c23ea2d92?cid=4c7acac22bee47d09ae1ad7cf23c1261"
    },
    {
      "trackId": "66LT15XEqCaWiMG44NGQRE",
      "trackName": "Here To Stay",
      "artists": "Korn",
      "albumName": "Untouchables",
      "albumArtwork": "https://i.scdn.co/image/ab67616d0000b273b9b950561aa1d3606865a2ee",
      "preview": "https://p.scdn.co/mp3-preview/284eeefc61792d899c9c79e876eb29510ef6d381?cid=4c7acac22bee47d09ae1ad7cf23c1261"
    },
    {
      "trackId": "1pHPpLVH2XEN0xYRoQs4wq",
      "trackName": "Word Up!",
      "artists": "Korn",
      "albumName": "Word Up! (The Remixes)",
      "albumArtwork": "https://i.scdn.co/image/ab67616d0000b273d28bc84c691163fb094787fa",
      "preview": "https://p.scdn.co/mp3-preview/2650a4d7de64834ec27f3542517c289dccb4fc6a?cid=4c7acac22bee47d09ae1ad7cf23c1261"
    }
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
  
  const updatePlaylistHandler = (details) => {
    if(playlist.find((e) => e.trackId === details.trackId)) {
      return setPlaylist(playlist.filter(e => e.trackId !== details.trackId));
    }

    setPlaylist([...playlist, details]);
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
