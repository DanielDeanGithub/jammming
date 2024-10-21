import React from 'react'
import SearchResult from '../SearchResult/SearchResult.js';

const Playlist = ({playlist, updatePlaylist}) => {
  return (
    <div id='playlist'>
      <h2>Playlist</h2>
      {
        playlist.length > 0 && 
        playlist.map(track => <SearchResult details={track} updatePlaylist={updatePlaylist}/>)
      }
    </div>
  )
}

export default Playlist