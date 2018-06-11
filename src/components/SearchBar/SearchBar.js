import React from "react";
import './SearchBar.css'

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  handleTermChange(event) {
    this.setState({searchTerm : event.target.value});
  }

  search() {
    this.props.onSearch(this.state.searchTerm);

  }

  render() {
    console.log("SearchBar.render");
    console.log(this);
    return (
      <div className="SearchBar">
        <input
          onChange={this.handleTermChange}
          placeholder="Enter A Song, Album, or Artist"
        />
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
