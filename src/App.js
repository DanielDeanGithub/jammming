import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar.js';
import SearchResults from './components/SearchResults/SearchResults.js';
import SearchButton from './components/SubmitButton/SubmitButton.js';
import { initialiseSpotify, testRefresh, searchArtist } from './utilities/Spotify.js';

function App() {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const searchButtonClickHandler = () => {
    setSearchResults([searchArtist(search)]);
  };
  
  return (
    <div className='App'>
      <header className='App-header'>
        <button onClick={initialiseSpotify}>Allow App</button>
        
        <button onClick={testRefresh}>TEST</button>

        <SearchBar value={search} onChange={e => setSearch(e.target.value)}/>
        <SearchButton onClick={searchButtonClickHandler}/>
        <SearchResults results={searchResults}/>


        <h1>Display your Spotify profile data</h1>
        <section id="profile">
        <h2>Logged in as <span id="displayName"></span></h2>
        <span id="avatar"></span>
        <ul>
            <li>User ID: <span id="id"></span></li>
            <li>Email: <span id="email"></span></li>
            <li>Spotify URI: <a id="uri" href="#"></a></li>
            <li>Link: <a id="url" href="#"></a></li>
            <li>Profile Image: <span id="imgUrl"></span></li>
        </ul>
        </section>



      </header>
    </div>
  );
}

export default App;
