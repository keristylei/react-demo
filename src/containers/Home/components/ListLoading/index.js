import React, { Component } from "react";
import "./style.less";

class ListLoading extends Component {
  render() {
    return (
      <div className="flex-box-load">
        <div className="flex-item left" />
        <div className="flex-item children-flex-box right">
          <div><img className="img-icon" alt="" /></div>
          <div className="children-flex-item">
            <div/>
            <div/>
            <div/>
          </div>
        </div>
      </div>
    );
  }
}

export default ListLoading;
