import React, { useState }  from 'react'
import './SearchResults.css';

const SearchResult = ({playlist, details, updatePlaylist}) => {
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

    const checkPlaylist = () => playlist.find(track => track['trackId'] === details['trackId']);

    return (    
        <div key={details['trackId']} className='result'>

            <button onClick={() => updatePlaylist(details)}>{checkPlaylist() ? '-' : '+' }</button>
            
            <div className='artwork-container'>
                <img className='artwork' src={details['albumArtwork']} alt={details['trackName'] + ' Artwork'} />
                <audio id={details['trackId']} src={details['preview']} />
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