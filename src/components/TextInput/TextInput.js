import React from 'react';

const TextInput = ({search, onChange, onKeyDown}) => {
    return (
        <input type="text" className="text-input" value={search} onChange={onChange} onKeyDown={onKeyDown}/>
    );
};

export default TextInput;