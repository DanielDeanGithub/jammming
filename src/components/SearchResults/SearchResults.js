import React from 'react'

const SearchResults = ({results}) => {
  console.log(results)

  return (
    <>
        <h2>Search Results</h2>
        <ul>
            {results.map((e,i) => <li key={i}>{e}</li>)}
        </ul>
    </>
  )
}

export default SearchResults