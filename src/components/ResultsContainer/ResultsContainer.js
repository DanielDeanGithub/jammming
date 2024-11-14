import React from 'react'
import TextInput from '../TextInput/TextInput.js';
import TextInputButton from '../TextInputButton/TextInputButton.js';
import SearchResultsList from '../SearchResultsList/SearchResultsList.js';

const ResultsContainer = () => {
  return (
    <div className='flex-container'>
      <TextInput 
        value={searchTerm} 
        onChange={e =>  setSearchTerm(e.target.value)} 
        onKeyDown={searchKeyDownHandler} 
        />
      <TextInputButton onClick={searchButtonClickHandler} buttonText="Search"/>
      <SearchResultsList playlist={playlist} results={searchResults} updatePlaylist={updatePlaylistHandler}/>
    </div>
  )
}

export default ResultsContainer