import React, { Component } from 'react';
import { Rate } from 'antd';
import './style.less';

class FreeApp extends Component {
  render() {
    const { title, category, rate, imgUrl, index } = this.props;
    return (
      <div className="flex-box">
        <img  className={`img-icon flex-item ${(index%2) ? "round" : null}`} src={imgUrl} alt=''></img>
        <div>
          <div className="dp-font30">{title}</div>
          <div className="dp-font30 type">{category}</div>
          <div className="dp-font30"><Rate disabled allowHalf defaultValue={rate} /></div>
        </div>
      </div>
    );
  }
}

export default FreeApp;