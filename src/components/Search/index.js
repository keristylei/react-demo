import React, { Component } from "react";
import { SearchBar } from "antd-mobile";
import "./style.less";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: ""
    };
  }

  componentDidMount() {}
  onChange = value => {
    this.setState({ searchKey: value });
  };
  clear = () => {
    this.setState({ searchKey: "" });
  };

  render() {
    return (
      <div className="search-container t-c">
        <SearchBar
          placeholder="搜寻"
          onClear={this.props.handleClear}
          onChange={this.props.handleSearch}
          onCancel={this.props.handelCancelSearch}
        />
      </div>
    );
  }

  handChange = e => {
    this.setState({
      searchKey: e.target.value
    });
  };
}

export default Search;
