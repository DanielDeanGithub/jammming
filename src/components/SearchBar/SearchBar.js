import React from 'react';

const SearchBar = ({search, onChange}) => {
    return (
        <input id="Search" value={search} onChange={onChange}/>
    );
};

export default SearchBar;