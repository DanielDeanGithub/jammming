import React from 'react'
import SearchResult from '../SearchResult/SearchResult.js';

const Playlist = ({playlist, updatePlaylist}) => {
  return (
    <div id='playlist'>
      <h2>Current Playlist</h2>
      <div className='results-container'>
        {
          playlist.length > 0 && 
          playlist.map(track => <SearchResult playlist={playlist} details={track} updatePlaylist={updatePlaylist}/>)
        }
      </div>
    </div>
  )
}

export default Playlist