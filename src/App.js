import React, { useState, useEffect } from 'react';
import './App.css';
import TextInput from './components/TextInput/TextInput.js';
import SearchResultsList from './components/SearchResultsList/SearchResultsList.js';
import TextInputButton from './components/TextInputButton/TextInputButton.js';
import Playlist from './components/Playlist/Playlist.js';
import { reqUserAuth, parseAuthCode, testRefresh, searchSpotify } from './utilities/Spotify.js';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [authorisation, setAuthorisation] = useState(null);
  const [accessCode, setAccessCode] = useState('');
  const [playlist, setPlaylist] = useState([
    {
      "trackId": "6W21LNLz9Sw7sUSNWMSHRu",
      "trackName": "Freak On a Leash",
      "artists": "Korn",
      "albumName": "Follow The Leader",
      "albumArtwork": "https://i.scdn.co/image/ab67616d0000b27350d216aebaf98e8ac9947fd5",
      "preview": "https://p.scdn.co/mp3-preview/1748e7fff0689e02eed3deebaf7837afabbe8657?cid=4c7acac22bee47d09ae1ad7cf23c1261"
    },
    {
      "trackId": "1AzMYJm6qTAullM3UKuPY9",
      "trackName": "Y'all Want a Single",
      "artists": "Korn",
      "albumName": "Take A Look In The Mirror",
      "albumArtwork": "https://i.scdn.co/image/ab67616d0000b273f3d72bc62b3f0fc059da2e46",
      "preview": "https://p.scdn.co/mp3-preview/201d3ef8c8bda46bfe36a44121b51b36fd7ef00d?cid=4c7acac22bee47d09ae1ad7cf23c1261"
    },
    {
      "trackId": "1pr9TZGOXeJUggIal1Wq3R",
      "trackName": "Blind",
      "artists": "Korn",
      "albumName": "Korn",
      "albumArtwork": "https://i.scdn.co/image/ab67616d0000b2737153b1cf6ee990c2a9fa46cc",
      "preview": "https://p.scdn.co/mp3-preview/7c2868a7b00e17f310b3366160f900749490d468?cid=4c7acac22bee47d09ae1ad7cf23c1261"
    },
    {
      "trackId": "6nJPHXRpKYv2yqtalEjKy5",
      "trackName": "Got the Life",
      "artists": "Korn",
      "albumName": "Follow The Leader",
      "albumArtwork": "https://i.scdn.co/image/ab67616d0000b27350d216aebaf98e8ac9947fd5",
      "preview": "https://p.scdn.co/mp3-preview/a00d6ae17c2fbde9ea9e32de36bb487e5acc511b?cid=4c7acac22bee47d09ae1ad7cf23c1261"
    },
    {
      "trackId": "1AJx5jJQy9pKKxcnHm85RY",
      "trackName": "Dysfunctional",
      "artists": "Tech N9ne Collabos",
      "albumName": "Sickology 101",
      "albumArtwork": "https://i.scdn.co/image/ab67616d0000b27349440f89d229d070b504be74",
      "preview": "https://p.scdn.co/mp3-preview/1a83105f02085df973a907e83bd9e88ac7f1cbc1?cid=4c7acac22bee47d09ae1ad7cf23c1261"
    },
    {
      "trackId": "5buj0D6E7rCRFi3xV9STYo",
      "trackName": "Red Kingdom",
      "artists": "Tech N9ne",
      "albumName": "Red Kingdom",
      "albumArtwork": "https://i.scdn.co/image/ab67616d0000b2736a91f27d2e8929d97a05359f",
      "preview": "https://p.scdn.co/mp3-preview/65449a6479a72d51e71fd6dbf69a2a9d860308e1?cid=4c7acac22bee47d09ae1ad7cf23c1261"
    },
    {
      "trackId": "6M47gaKejso9772SKTa3yH",
      "trackName": "Face Off",
      "artists": "Tech N9ne, Joey Cool, King Iso, Dwayne Johnson",
      "albumName": "ASIN9NE",
      "albumArtwork": "https://i.scdn.co/image/ab67616d0000b2735ee0a1dafbbf6d8d430821a3",
      "preview": "https://p.scdn.co/mp3-preview/641987c1abed761fc84d76b19a8275a7ed5b3baa?cid=4c7acac22bee47d09ae1ad7cf23c1261"
    },
    {
      "trackId": "26sfR6xBMYUQ9ORoopLphT",
      "trackName": "Caribou Lou (Album Version (Explicit))",
      "artists": "Tech N9ne",
      "albumName": "Everready",
      "albumArtwork": "https://i.scdn.co/image/ab67616d0000b273223e3402f4b554263ec5fc9f",
      "preview": "https://p.scdn.co/mp3-preview/68065106a5155866c7668f3bcd2cd4a7bc2fc229?cid=4c7acac22bee47d09ae1ad7cf23c1261"
    },
    {
      "trackId": "33MpATo5CCG2ennj6LAlYq",
      "trackName": "Speedom (Wwc2)",
      "artists": "Tech N9ne, Eminem, Krizz Kaliko",
      "albumName": "Special Effects",
      "albumArtwork": "https://i.scdn.co/image/ab67616d0000b2734b6ce6a88e6aa90472519aab",
      "preview": "https://p.scdn.co/mp3-preview/6b34dc2ab738bd3b13ffe0fd73e0a8c19d13f3ca?cid=4c7acac22bee47d09ae1ad7cf23c1261"
    },
    {
      "trackId": "1xeIvccuZq4DiqqmZDSbAg",
      "trackName": "Ronald",
      "artists": "Falling In Reverse, Tech N9ne, Alex Terrible",
      "albumName": "Ronald",
      "albumArtwork": "https://i.scdn.co/image/ab67616d0000b2733c802f3350f822e6de76add6",
      "preview": "https://p.scdn.co/mp3-preview/0f8397922ef799b81e7f573e107819a69525c86e?cid=4c7acac22bee47d09ae1ad7cf23c1261"
    },
    {
      "trackId": "5dqrgmHHBuUzwYKBXJuIm0",
      "trackName": "Like I Ain't",
      "artists": "Tech N9ne",
      "albumName": "N9NA",
      "albumArtwork": "https://i.scdn.co/image/ab67616d0000b27369ca801157537b266dc93873",
      "preview": "https://p.scdn.co/mp3-preview/d2e10c24c2eb9ad0140319454e5bc37398b17573?cid=4c7acac22bee47d09ae1ad7cf23c1261"
    },
    {
      "trackId": "470oq4Gp1WAczVeuYri9ZU",
      "trackName": "The Beast (Album Version (Explicit))",
      "artists": "Tech N9ne",
      "albumName": "Everready",
      "albumArtwork": "https://i.scdn.co/image/ab67616d0000b273223e3402f4b554263ec5fc9f",
      "preview": "https://p.scdn.co/mp3-preview/48a326cddf7b1b0ca3c0f482b51e7f3c7c5ce63f?cid=4c7acac22bee47d09ae1ad7cf23c1261"
    },
    {
      "trackId": "4hsncV3bzuB83dBJcnSCBl",
      "trackName": "Straight Out the Gate",
      "artists": "Tech N9ne, Krizz Kaliko, Serj Tankian",
      "albumName": "Something Else",
      "albumArtwork": "https://i.scdn.co/image/ab67616d0000b2735021c52bfa5ca127b5d35d7f",
      "preview": "https://p.scdn.co/mp3-preview/5ab3627257143b07799cc04341bc1e4e1bd12dcd?cid=4c7acac22bee47d09ae1ad7cf23c1261"
    },
    {
      "trackId": "2eKoPnGnuHqIpfph45z44W",
      "trackName": "Ronald",
      "artists": "Falling In Reverse, Tech N9ne, Alex Terrible",
      "albumName": "Popular Monster",
      "albumArtwork": "https://i.scdn.co/image/ab67616d0000b273cd850819595472eae0c06f66",
      "preview": "https://p.scdn.co/mp3-preview/5f7ec2d6ca0277056e86bdd55867ca913d51ed8e?cid=4c7acac22bee47d09ae1ad7cf23c1261"
    },
    {
      "trackId": "0xgsyoVvRFSYvV5cdtYhX1",
      "trackName": "A.D.I.D.A.S.",
      "artists": "Korn",
      "albumName": "Life Is Peachy",
      "albumArtwork": "https://i.scdn.co/image/ab67616d0000b273ad4ca82999655cfc56c86828",
      "preview": "https://p.scdn.co/mp3-preview/5563e0ac1abc51549b3f963b3b3079c01de32a95?cid=4c7acac22bee47d09ae1ad7cf23c1261"
    },
    {
      "trackId": "05NpeTQWnzXS1d8ZqL4YFZ",
      "trackName": "Twisted Transistor",
      "artists": "Korn",
      "albumName": "See You On the Other Side",
      "albumArtwork": "https://i.scdn.co/image/ab67616d0000b27374c1560b64750a1774495144",
      "preview": "https://p.scdn.co/mp3-preview/cd0384bcafc23a0e837cf9b56b9d20232926ef02?cid=4c7acac22bee47d09ae1ad7cf23c1261"
    },
    {
      "trackId": "1pHPpLVH2XEN0xYRoQs4wq",
      "trackName": "Word Up!",
      "artists": "Korn",
      "albumName": "Word Up! (The Remixes)",
      "albumArtwork": "https://i.scdn.co/image/ab67616d0000b273d28bc84c691163fb094787fa",
      "preview": "https://p.scdn.co/mp3-preview/2650a4d7de64834ec27f3542517c289dccb4fc6a?cid=4c7acac22bee47d09ae1ad7cf23c1261"
    },
    {
      "trackId": "66LT15XEqCaWiMG44NGQRE",
      "trackName": "Here To Stay",
      "artists": "Korn",
      "albumName": "Untouchables",
      "albumArtwork": "https://i.scdn.co/image/ab67616d0000b273b9b950561aa1d3606865a2ee",
      "preview": "https://p.scdn.co/mp3-preview/284eeefc61792d899c9c79e876eb29510ef6d381?cid=4c7acac22bee47d09ae1ad7cf23c1261"
    },
    {
      "trackId": "3o7TMr6RmIusYH7Kkg7ujR",
      "trackName": "Coming Undone",
      "artists": "Korn",
      "albumName": "See You On the Other Side",
      "albumArtwork": "https://i.scdn.co/image/ab67616d0000b27374c1560b64750a1774495144",
      "preview": "https://p.scdn.co/mp3-preview/c10c217565e7fbd00b48d165cc27fa876bdace4f?cid=4c7acac22bee47d09ae1ad7cf23c1261"
    },
    {
      "trackId": "2F6FfZ4w8z3eJpSxPotVO5",
      "trackName": "Falling Away from Me",
      "artists": "Korn",
      "albumName": "Issues",
      "albumArtwork": "https://i.scdn.co/image/ab67616d0000b2731c229cb7c9851fb0c67e2af8",
      "preview": "https://p.scdn.co/mp3-preview/07275c56a497095ef0a987eae808f43c23ea2d92?cid=4c7acac22bee47d09ae1ad7cf23c1261"
    }
  ]);
  const [playlistName, setPlaylistName] = useState('');

  const searchButtonClickHandler = async () => {
    setSearchResults(await searchSpotify(searchTerm));
  };



  useEffect(() => {
    const args = new URLSearchParams(window.location.search);
    const code = args.get('code');
    setAuthorisation(code);
  });

  useEffect(() => {
    const getAccessCode = async () => await parseAuthCode(authorisation);
    getAccessCode().then(code => setAccessCode(code));
  },[authorisation]);
  
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
            ? <button onClick={reqUserAuth}>Login</button>
            : <>

                <div className='flex-container'>
                  <TextInput value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
                  <TextInputButton onClick={searchButtonClickHandler} buttonText="Search"/>
                </div>
                <div className='flex-container'>
                  <TextInput value={playlistName} onChange={e => setPlaylistName(e.target.value)}/>
                  <TextInputButton onClick={searchButtonClickHandler} buttonText="Save Playlist"/>
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
