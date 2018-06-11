import React from "react";
import './playlist.css';
import TrackList from "../Tracklist/TrackList.js";

class Playlist extends React.Component {

  constructor(props) {
      super(props);
      this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange (event) {
    this.props.onNameChange (event.target.value);
  }

  render() {
    console.log("Playlist.render");
    console.log(this);
    return (
      <div className="Playlist">
        <input
          onChange={this.handleNameChange}
          defaultValue={'New Playlist'}
        />
        <TrackList
          isRemoval={true}
          onRemove={this.props.onRemove}
          tracks={this.props.playlistTracks}
        />
        <a
          className="Playlist-save"
          onClick={this.props.onSave}>
          SAVE TO SPOTIFY</a>
      </div>
    )
  }
}

export default Playlist;
