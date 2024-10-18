import React from 'react'

const SearchResults = ({results}) => {
  return (
    <div id='searchResults'>
      <h2>Search Results</h2>
      {
        results.map((e,i) => {
          return (
            <div key={i} className='result'>
              <h3>{e['trackName']}</h3>
              <h4>{e['artists']} - {e['albumName']}</h4> 
              <img src={e['albumArtwork']} alt={e['trackName'] + ' Artwork'} />
            </div>
          )
        })
      }
    </div>
  )
}

export default SearchResults