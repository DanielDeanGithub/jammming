import React, { useState, useEffect } from 'react';
import './App.css';
import TextInput from './components/TextInput/TextInput.js';
import SearchResultsList from './components/SearchResultsList/SearchResultsList.js';
import TextInputButton from './components/TextInputButton/TextInputButton.js';
import Playlist from './components/Playlist/Playlist.js';
import { checkLoginStatus, loginWithSpotify, logoutClick, searchSpotify, savePlaylist } from './utilities/Spotify.js';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [accessCode, setAccessCode] = useState(false);
  const [playlist, setPlaylist] = useState([
    {
      "trackId": "5enxwA8aAbwZbf5qCHORXi",
      "trackName": "All Too Well (10 Minute Version) (Taylor's Version) (From The Vault)",
      "artists": "Taylor Swift",
      "albumName": "Red (Taylor's Version)",
      "albumArtwork": "https://i.scdn.co/image/ab67616d0000b273318443aab3531a0558e79a4d",
      "preview": null,
      "uri": "spotify:track:5enxwA8aAbwZbf5qCHORXi"
    },
    {
      "trackId": "4N8jp4BFUXzhnIgh4xyBgX",
      "trackName": "Anticure",
      "artists": "Whitechapel",
      "albumName": "Kin",
      "albumArtwork": "https://i.scdn.co/image/ab67616d0000b273ec191ffd85f98a0a6ed342b4",
      "preview": "https://p.scdn.co/mp3-preview/1e47d334c0ae64dcb44156ef2a2396e5efca1e01?cid=4c7acac22bee47d09ae1ad7cf23c1261",
      "uri": "spotify:track:4N8jp4BFUXzhnIgh4xyBgX"
    },
    {
      "trackId": "2LKOHdMsL0K9KwcPRlJK2v",
      "trackName": "After Dark",
      "artists": "Mr.Kitty",
      "albumName": "Time",
      "albumArtwork": "https://i.scdn.co/image/ab67616d0000b273b492477206075438e0751176",
      "preview": "https://p.scdn.co/mp3-preview/eb9de15a4465f504ee0eadba93e7d265ee0ee6ba?cid=4c7acac22bee47d09ae1ad7cf23c1261",
      "uri": "spotify:track:2LKOHdMsL0K9KwcPRlJK2v"
    },
    {
      "trackId": "02TtDZcUvEJGFJSJ6fTMfn",
      "trackName": "Always Love",
      "artists": "Lauren Jauregui",
      "albumName": "Always Love",
      "albumArtwork": "https://i.scdn.co/image/ab67616d0000b2734d5252e197365b4b19b6cfb0",
      "preview": "https://p.scdn.co/mp3-preview/4d4bdcb0cc208be26969f07210ab1009fdf97708?cid=4c7acac22bee47d09ae1ad7cf23c1261",
      "uri": "spotify:track:02TtDZcUvEJGFJSJ6fTMfn"
    },
    {
      "trackId": "1pr9TZGOXeJUggIal1Wq3R",
      "trackName": "Blind",
      "artists": "Korn",
      "albumName": "Korn",
      "albumArtwork": "https://i.scdn.co/image/ab67616d0000b2737153b1cf6ee990c2a9fa46cc",
      "preview": "https://p.scdn.co/mp3-preview/7c2868a7b00e17f310b3366160f900749490d468?cid=4c7acac22bee47d09ae1ad7cf23c1261",
      "uri": "spotify:track:1pr9TZGOXeJUggIal1Wq3R"
    },
    {
      "trackId": "6W21LNLz9Sw7sUSNWMSHRu",
      "trackName": "Freak On a Leash",
      "artists": "Korn",
      "albumName": "Follow The Leader",
      "albumArtwork": "https://i.scdn.co/image/ab67616d0000b27350d216aebaf98e8ac9947fd5",
      "preview": "https://p.scdn.co/mp3-preview/1748e7fff0689e02eed3deebaf7837afabbe8657?cid=4c7acac22bee47d09ae1ad7cf23c1261",
      "uri": "spotify:track:6W21LNLz9Sw7sUSNWMSHRu"
    },
    {
      "trackId": "1AzMYJm6qTAullM3UKuPY9",
      "trackName": "Y'all Want a Single",
      "artists": "Korn",
      "albumName": "Take A Look In The Mirror",
      "albumArtwork": "https://i.scdn.co/image/ab67616d0000b273f3d72bc62b3f0fc059da2e46",
      "preview": "https://p.scdn.co/mp3-preview/201d3ef8c8bda46bfe36a44121b51b36fd7ef00d?cid=4c7acac22bee47d09ae1ad7cf23c1261",
      "uri": "spotify:track:1AzMYJm6qTAullM3UKuPY9"
    },
    {
      "trackId": "61mWefnWQOLf90gepjOCb3",
      "trackName": "Duality",
      "artists": "Slipknot",
      "albumName": "Vol. 3: The Subliminal Verses",
      "albumArtwork": "https://i.scdn.co/image/ab67616d0000b2736b3463e7160d333ada4b175a",
      "preview": "https://p.scdn.co/mp3-preview/c022f099ad0fce8686216c51a38325207cfd37ac?cid=4c7acac22bee47d09ae1ad7cf23c1261",
      "uri": "spotify:track:61mWefnWQOLf90gepjOCb3"
    },
    {
      "trackId": "6wqJeItl3Vc3az4ZicSQAB",
      "trackName": "Before I Forget",
      "artists": "Slipknot",
      "albumName": "Vol. 3: The Subliminal Verses",
      "albumArtwork": "https://i.scdn.co/image/ab67616d0000b2736b3463e7160d333ada4b175a",
      "preview": "https://p.scdn.co/mp3-preview/0f77f34ecc9516fa50dc8c720c41f2a85c836a98?cid=4c7acac22bee47d09ae1ad7cf23c1261",
      "uri": "spotify:track:6wqJeItl3Vc3az4ZicSQAB"
    },
    {
      "trackId": "3RAFcUBrCNaboRXoP3S5t1",
      "trackName": "Psychosocial",
      "artists": "Slipknot",
      "albumName": "All Hope Is Gone (10th Anniversary)",
      "albumArtwork": "https://i.scdn.co/image/ab67616d0000b273e7fbc0883149094912559f2c",
      "preview": "https://p.scdn.co/mp3-preview/36f6e029ac32c01f70c026d3770b49b6476e3c33?cid=4c7acac22bee47d09ae1ad7cf23c1261",
      "uri": "spotify:track:3RAFcUBrCNaboRXoP3S5t1"
    },
    {
      "trackId": "2gscB6kDOmrv1P6qs2KXE3",
      "trackName": "Wait and Bleed",
      "artists": "Slipknot",
      "albumName": "Slipknot (10th Anniversary Edition)",
      "albumArtwork": "https://i.scdn.co/image/ab67616d0000b273baf04a1d30db6ac9de26da7d",
      "preview": "https://p.scdn.co/mp3-preview/048641e64df740d2fba73110b673600c234bbeea?cid=4c7acac22bee47d09ae1ad7cf23c1261",
      "uri": "spotify:track:2gscB6kDOmrv1P6qs2KXE3"
    },
    {
      "trackId": "2W2eaLVKv9NObcLXlYRZZo",
      "trackName": "Spit It Out",
      "artists": "Slipknot",
      "albumName": "Slipknot (10th Anniversary Edition)",
      "albumArtwork": "https://i.scdn.co/image/ab67616d0000b273baf04a1d30db6ac9de26da7d",
      "preview": "https://p.scdn.co/mp3-preview/44bb61d7a0392d7dc2821879551e839f8c2aa35b?cid=4c7acac22bee47d09ae1ad7cf23c1261",
      "uri": "spotify:track:2W2eaLVKv9NObcLXlYRZZo"
    }
  ]);
  const [playlistName, setPlaylistName] = useState('');

  const searchButtonClickHandler = async () => {
    setSearchResults(await searchSpotify(searchTerm));
  };

  const savePlaylistButtonClickHandler = async () => {
    savePlaylist(playlistName, playlist.map(track => track['uri']));
  };

  useEffect(() => setAccessCode(checkLoginStatus()))
  
  const updatePlaylistHandler = (details) => {
    if(playlist.find((e) => e.trackId === details.trackId)) {
      return setPlaylist(playlist.filter(e => e.trackId !== details.trackId));
    }

    setPlaylist([...playlist, details]);
  }

  return (
    <div className='App'>
      <header className='App-header'>
        { 
          !accessCode 
            ? <button onClick={loginWithSpotify}>Login</button>
            : <>
                <button onClick={logoutClick}>Logout</button>
                <div className='flex-container'>
                  <TextInput value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
                  <TextInputButton onClick={searchButtonClickHandler} buttonText="Search"/>
                </div>
                <div className='flex-container'>
                  <TextInput value={playlistName} onChange={e => setPlaylistName(e.target.value)}/>
                  <TextInputButton onClick={savePlaylistButtonClickHandler} buttonText="Save Playlist"/>
                </div>
                <div className='flex-container'>
                  <SearchResultsList playlist={playlist} results={searchResults} updatePlaylist={updatePlaylistHandler}/>
                  <Playlist playlist={playlist} updatePlaylist={updatePlaylistHandler}/>
                </div>
              </>    
        }
      </header>
    </div>
  );
}

export default App;
