import React from 'react'

const TextInputButton = ({onClick, buttonText = "Submit"}) => {
  return (
    <button className='text-input-button' onClick={onClick}>{buttonText}</button>
  )
}

export default TextInputButton