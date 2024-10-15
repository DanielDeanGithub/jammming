import React from 'react';

const SearchBar = ({search, onChange}) => {
    return (
        <input type="text" id="searchBar" value={search} onChange={onChange}/>
    );
};

export default SearchBar;