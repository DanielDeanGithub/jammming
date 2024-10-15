import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar.js';
import SearchResults from './components/SearchResults/SearchResults.js';
import SearchButton from './components/SubmitButton/SubmitButton.js';

function App() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
        <SearchBar value={search}  onChange={e => setSearch(e.target.value)}/>
        <SearchButton onClick={() => setSearchResults([search])}/>
        <SearchResults results={searchResults}/>
      </header>
    </div>
  );
}

export default App;
