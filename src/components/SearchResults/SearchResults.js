import React from 'react'
import './SearchResults.css'

const SearchResults = ({results}) => {
  return (
    <div id='search-results'>
      <h2>Search Results</h2>
      {
        results.map((e) => {
          return (
            <div key={e['trackId']} className='result'>
              <div className='artwork-container'>
                <img className='artwork' src={e['albumArtwork']} alt={e['trackName'] + ' Artwork'} />
              </div>
              <div className='text'>
                <h3>{e['trackName']}</h3>

                <div className='sub-text'>
                  <h4>{e['artists']}</h4> 
                  <h4>-</h4>
                  <h4>{e['albumName']}</h4>
                </div>
              </div>
              <audio id={e['trackId']} src={e['preview']} />
              <button onClick={() => document.getElementById(e['trackId']).paused 
                  ? document.getElementById(e['trackId']).play()
                  : document.getElementById(e['trackId']).pause()}>Play/Pause</button>
            </div>
          )
        })
      }
    </div>
  )
}

export default SearchResults