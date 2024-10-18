import React from 'react'

const SearchResults = ({results}) => {
  console.log(results)

  return (
    <>
      <h2>Search Results</h2>
        {/* 
        <ul>
            {
              results.map((e,i) => {
                return (
                  <li key={i}>
                    <h3>
                      <a href={e['external_urls']['spotify']}>{e['name']}</a>
                    </h3> 
                    <img src={e['images'][0]['url']} alt={e['name'] + 'photo'} />
                  </li>
                  
                )
              })
            }
        </ul> */}
    </>
  )
}

export default SearchResults