import React from 'react';

const SearchBar = (props) => {
    return (
        <input id="Search" value={props.search} onChange={props.onChange}/>
    );
};

export default SearchBar;