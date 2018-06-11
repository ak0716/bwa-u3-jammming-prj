import React from 'react';

import './TrackList.css';

import Track from '../Track/Track';

class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        {this.props.tracks.map(track => {
          return (
            <Track
              track={track}
              key={track.id}
              onAdd={this.props.onAdd}
              isRemoval={this.props.isRemoval}
              onRemove={this.props.onRemove}
            />
          );
        })}
      </div>
    );
  }
}

export default TrackList;

/*
This code didn't work
import React from "react";
import Track from '../Track/Track';
import './TrackList.css';

console.log('entering TrackList.js');

class TrackList extends React.Component {
  render() {
    console.log("TrackList.render");
    console.log(this);
    return (
      <div className="TrackList">
          {this.props.tracks.map((theTrack) => {
            <Track
              isRemoval={this.props.isRemoval}
              key={theTrack.id}
              trackData={theTrack}
              onAdd={this.props.onAdd}
              onRemove={this.props.onRemove}
            />
          })}
      </div>);
  }
}

console.log("leaving TrackList.js");

export default TrackList;
*/
