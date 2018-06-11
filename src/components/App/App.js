import React from 'react';
//import logo from './logo.svg';
import './App.css';
import SearchBar from "../SearchBar/SearchBar.js";
import SearchResults from "../SearchResults/SearchResults.js";
import Playlist from '../Playlist/playlist.js';
import Spotify from '../../util/Spotify';

console.log('entering App.js');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    };

    this.search = this.search.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }
  /*constructor(props){
    super(props);
    this.state = {
      searchResults: [
          {
            name: 'Diamonds',
            artist: 'Paul Simon',
            album: 'Graceland',
            id: 123
          }],
      playlistTracks : [
        {
          name: 'Blackbird',
          artist: 'The Beatles',
          album: 'White Album',
          id: 200
        }],
      playlistName : 'Example Playlist'
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }*/

  addTrack(track) {
    console.log({track: track, this : this});
    if (!track) {
      console.log('App.addTrack: input track empty.');
      return;
    }
    //Check if track.id matches the id of any element of playlistTracks
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    //If the id is new, add the song to the end of the playlist
    this.state.playlistTracks.push(track);
    //Set the new state of the playlist, ?? IS THIS CORRECT ??
    this.setState(this.state.playlistTracks);
  }

  removeTrack(track) {
    var foundIndex = this.state.playlistTracks.findIndex(
                      savedTrack => savedTrack.id === track.id);
    if (!foundIndex) {
      return;
    }
    //Remove foundIndex from playlistTracks
    this.state.playlistTracks.splice(foundIndex, 1);
    //Sets the new state of the playlist
    this.setState(this.state.playlistTracks);
  }

  updatePlaylistName(name) {
    //this.setState(this.state.playlistName);
    this.setState({playlistName : name});
  }

//?? Where are track URIs set? Is this the same thing as the track ID?
  savePlaylist(){
    var trackURIs = this.state.playlistTracks.map(x => x.uri);
    var playlistName = this.state.playlistName;
    Spotify.savePlaylist(playlistName, trackURIs);
    this.setState({playlistName : 'New Playlist'});
    this.setState({playlistTracks : []});
  }

  search(searchTerm) {
    console.log('App.search, searchTerm: ' + searchTerm);
    Spotify.search(searchTerm).then(searchResults => {
      console.log(searchResults);
      this.setState({searchResults : searchResults});
    });
  }

  render() {
    console.log("App.render");
    console.log(this);
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
         <SearchBar
           onSearch={this.search}
         />
          <div className="App-playlist">
            <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults} />
            <Playlist
              onSave={this.savePlaylist}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
            />
          </div>
        </div>
      </div>
    );
  }
}

console.log("leaving App.js");

export default App;
