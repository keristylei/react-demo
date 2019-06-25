import React, { Component } from "react";
import FreeApp from "../../../../components/FreeApp/index";

class index extends Component {
  render() {
    const { appData, index } = this.props;
    return (
      <div className="app-list-item">
        <div className="range dp-font40">{index + 1}</div>
        <FreeApp key={`app_${index}`} {...appData} index={index} />
      </div>
    );
  }
}

export default index;
