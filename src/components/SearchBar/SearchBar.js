import React, { useState, useEffect } from 'react';

function SearchBar() {
    const [search, setSearch] = useState("");

    return (
        <input id="Search" />
    );
};

export default SearchBar;