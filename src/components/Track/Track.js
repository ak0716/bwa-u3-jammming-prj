import React from 'react';

import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack(event) {
    this.props.onAdd(this.props.track);
  }

  removeTrack(event) {
    this.props.onRemove(this.props.track);
  }

  renderAction() {
    if (this.props.isRemoval) {
      return (
        <a className="Track-action" onClick={this.removeTrack}>
          -
        </a>
      );
    }
    return (
      <a className="Track-action" onClick={this.addTrack}>
        +
      </a>
    );
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>
            {this.props.track.artist} | {this.props.track.album}
          </p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;

/*
Code didn't work
import React from "react";
import './Track.css'

class Track extends React.Component {
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack(){
    console.log('Track.addTrack');
  }

  removeTrack(){
    console.log('Track.removeTrack');
  }

  renderAction() {
    if (this.props.isRemoval) {
      return <a onClick={this.removeTrack} className="Track-action">–</a>
    }
    return <a onClick={this.addTrack} className="Track-action">+</a>
    }

  render() {
    console.log("Track.render");
    console.log(this);
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.trackData.name}</h3>
          <p>{this.props.trackData.artist} | {this.props.trackData.album}</p>
        </div>
          {this.renderAction()}
      </div>
    )
  }
}

export default Track;
*/
