import React, { useState }  from 'react';
import SearchResult from '../SearchResult/SearchResult';

const SearchResultsList = ({playlist, results, updatePlaylist}) => {
  return (
    <div id='search-results'>
      <h2>Search Results</h2>
      {
        results.map((e) => <SearchResult playlist={playlist} details={e} updatePlaylist={updatePlaylist}/>)
      }
    </div>
  )
}

export default SearchResultsList;