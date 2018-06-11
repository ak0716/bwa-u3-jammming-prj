import React from "react";
import TrackList from "../Tracklist/TrackList.js";
import './SearchResults.css';

class SearchResults extends React.Component {
  render() {
    console.log("SearchResults.render");
    console.log(this);
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList onAdd={this.props.onAdd} tracks={this.props.searchResults} isRemoval={false} />
      </div>
    )
  }
}

export default SearchResults;
