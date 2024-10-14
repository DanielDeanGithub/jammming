import React, { useState, useEffect } from 'react';

function SearchBar() {
    const [search, setSearch] = useState("");

    return (
        <input id="Search" value={search} onChange={e => setSearch(e.target.value)}/>
    );
};

export default SearchBar;