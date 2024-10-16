import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar.js';
import SearchResults from './components/SearchResults/SearchResults.js';
import SearchButton from './components/SubmitButton/SubmitButton.js';
import Spotify from './utilities/Spotify.js';

function App() {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  useEffect(() => {
    if (search === '') document.getElementById("searchBar").value = search;
  }, [search])

  const searchButtonClickHandler = () => {
    setSearchResults([search]);
    setSearch('');
  };
  
  return (
    <div className='App'>
      <header className='App-header'>
        <SearchBar value={search} onChange={e => setSearch(e.target.value)}/>
        <SearchButton onClick={searchButtonClickHandler}/>
        <SearchResults results={searchResults}/>
      </header>
    </div>
  );
}

export default App;
