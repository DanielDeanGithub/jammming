import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar.js';
import SearchResultsList from './components/SearchResultsList/SearchResultsList.js';
import SearchButton from './components/SubmitButton/SubmitButton.js';
import { reqUserAuth, parseAuthCode, testRefresh, searchSpotify } from './utilities/Spotify.js';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [authorisation, setAuthorisation] = useState(null);
  const [accessCode, setAccessCode] = useState('');

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
                <SearchResultsList results={searchResults}/>
              </>    
        }
      </header>
    </div>
  );
}

export default App;
