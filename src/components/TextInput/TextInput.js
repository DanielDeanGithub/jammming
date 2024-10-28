import React from 'react';

const TextInput = ({search, onChange}) => {
    return (
        <input type="text" className="text-input" value={search} onChange={onChange}/>
    );
};

export default TextInput;