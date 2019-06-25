import React, { Component } from 'react';
import './style.less';

class HotsaleApp extends Component {
  render() {
    const { title, category, imgUrl } = this.props;
    return (
      <div>
        <img className="img-icon" src={imgUrl} alt=''></img>
        <div className="text-container">
          <p className="dp-font30">{title}</p>
          <p className="dp-font30">{category}</p>
        </div>
      </div>
    );
  }
}

export default HotsaleApp;