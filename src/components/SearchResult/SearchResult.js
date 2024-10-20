import React, { useState }  from 'react'
import './SearchResults.css';

const SearchResult = ({details}) => {
    const [audioPlaying, setAudioPlaying] = useState(false);

    const onClickHandler = () => {
        const audio = window.document.getElementById(details['trackId']);
        if (audio.paused) {
            audio.play() 
            setAudioPlaying(true);
        } else {
            audio.pause()
            setAudioPlaying(false);
        }            
    };

  return (    
    <div key={details['trackId']} className='result'>
        <audio id={details['trackId']} src={details['preview']} />
        
        <div className='artwork-container'>
            <img className='artwork' src={details['albumArtwork']} alt={details['trackName'] + ' Artwork'} />
            <button className="audio-button" onClick={onClickHandler}>{audioPlaying ? 'II' : '▶'}</button>
        </div>
        
        <div className='text'>
            <h3>{details['trackName']}</h3>
            <div className='sub-text'>
                <h4>{details['artists']} - {details['albumName']}</h4>
            </div>
        </div>
        
    </div>
  )
}

export default SearchResult