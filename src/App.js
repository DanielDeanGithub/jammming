import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar.js';

function App() {
  const [search, setSearch] = useState("");

  return (
    <div className="App">
      <header className="App-header">
        <SearchBar value={search}  onChange={e => setSearch(e.target.value)}/>
      </header>
    </div>
  );
}

export default App;
