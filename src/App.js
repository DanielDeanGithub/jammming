import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar.js';
import SearchResults from './components/SearchResults/SearchResults.js';
import SearchButton from './components/SubmitButton/SubmitButton.js';

function App() {
  const [search, setSearch] = useState("");

  return (
    <div className="App">
      <header className="App-header">
        <SearchBar value={search}  onChange={e => setSearch(e.target.value)}/>
        <SearchButton />
        <SearchResults results={[search]}/>
      </header>
    </div>
  );
}

export default App;
