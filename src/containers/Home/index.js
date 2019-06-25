import React, { Component } from "react";
import Search from "../../components/Search/index";
import HotsaleApp from "../../components/HotsaleApp/index";
import Loading from "../../components/Loading";
import Loadable from "react-loadable";
import ListLoading from "./components/ListLoading/index"

import "./style.less";

const recomendListDatas = require("../../service/recomendData.json");
const appListDatas = require("../../service/appListData.json");

const LoadableComponent = Loadable({
  loader: () => import('./components/AppList/index'),
  loading: ListLoading
});

class App extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      data: [],
      loadTimes: 1
    };
    this.isSearch = false;
    this.removeListener = false;
    this.recommendData = [];
    this.appListData = [];
  }

  // 正式环境下按照接口请求真实数据，demo里面数据均为模拟
  async getAppListDataAsync() {
    // const res = getAppListData();
    // if (true) {
    //   freeAppDatas = res;
    // }
  }

  // 改造接口返回数据结构
  parseSourceData(dataSource) {
    let myDatas = [];
    dataSource.feed.entry.forEach(item => {
      let appObj = {};
      appObj.id = item.id.attributes["im:id"];
      appObj.title = item["im:name"].label;
      appObj.category = item.category.attributes.label;
      appObj.imgUrl = item["im:image"][item["im:image"].length - 1].label;
      appObj.rate = Number(
        (Math.floor(Math.random() * (5 - 1)) + 1).toFixed(2)
      );
      myDatas.push(appObj);
      return null;
    });
    return myDatas;
  }

  componentWillMount() {
    this.initData();
  }

  componentDidMount() {
    // this.getAppListDataAsync();
    const scrollContainer = document.getElementsByClassName("recomend")[0];
    scrollContainer.addEventListener("scroll", this.handleScroll.bind(this));
  }

  componentDidUpdate() {
    if (this.state.loadTimes >= 10 && !this.removeListener) {
      const scrollContainer = document.getElementsByClassName("recomend")[0];
      scrollContainer.removeEventListener(
        "scroll",
        this.handleScroll.bind(this)
      );
      this.removeListener = true;
    }
  }

  componentWillUnmount() {
    if (!this.removeListener) {
      const scrollContainer = document.getElementsByClassName("recomend")[0];
      scrollContainer.removeEventListener(
        "scroll",
        this.handleScroll.bind(this)
      );
    }
  }

  initData = () => {
    this.isSearch = false;
    this.recommendData = [];
    this.appListData = [];
    this.recommendData = this.parseSourceData(recomendListDatas);
    this.appListData = this.parseSourceData(appListDatas);
    const initAppDatas = this.appListData.slice(0, 10);
    this.setState({
      data: initAppDatas
    });
  };

  // 处理屏幕滚动事件，实现加载更多的效果
  handleScroll = () => {
    const scrollContainer = document.getElementsByClassName("recomend")[0];
    const scrollTop = scrollContainer.scrollTop || scrollContainer.scrollTop;
    const screenHeight = document.documentElement.clientHeight;
    const appListTop = this.myRef.current.offsetTop;
    const appListHeight = this.myRef.current.offsetHeight;
    const dataLength = this.state.data.length;
    const appListLength = this.appListData.length;
    if (
      !this.isSearch &&
      scrollTop >= appListHeight + appListTop - screenHeight &&
      dataLength < appListLength
    ) {
      const newData = this.state.data.concat(
        this.appListData.slice(
          this.state.loadTimes * 10,
          (this.state.loadTimes + 1) * 10
        )
      );
      const newLoadTimes = this.state.loadTimes + 1;
      setTimeout(() => {
        this.setState({
          data: newData,
          loadTimes: newLoadTimes
        });
      }, 1000);
    }
  };

  handleSearch = value => {
    this.isSearch = true;
    if (value === "") {
      this.initData();
    }
    this.recommendData = this.recommendData.filter(item => {
      return (
        item.title.indexOf(value) > -1 || item.category.indexOf(value) > -1
      );
    });
    let newData = this.appListData.filter(item => {
      return (
        item.title.indexOf(value) > -1 || item.category.indexOf(value) > -1
      );
    });
    this.setState({
      data: newData,
      loadTimes: 1
    });
  };

  handleClear = () => {
    this.initData();
  };

  render() {
    const { data, loadTimes } = this.state;
    return (
      <div className="box">
        <Search
          handleSearch={this.handleSearch}
          handelCancelSearch={this.initData}
          handleClear={this.handleClear}
        />
        {/* <ListLoading /> */}
        {this.recommendData.length > 0 || this.recommendData.length > 0 ? (
          <div className="recomend">
            <div className="title dp-font40">推介</div>
            {this.recommendData.length > 0 ? (
              <div className="slide-warpper">
                <div className="slide-box">
                  {this.recommendData.map((appData, index) => {
                    return (
                      <div className="slide-item">
                        <HotsaleApp
                          key={`hotsale_${index}`}
                          {...appData}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}

            <div ref={this.myRef} className="app-list-container">
              {data.map((appData, index) => {
                return (
                  <LoadableComponent appData={appData} index={index} />
                );
              })}
            </div>
            {!this.isSearch &&
            loadTimes < 10 &&
            data.length < this.appListData.length ? (
              <Loading />
            ) : (
              <div className="no-more-data">-- 已加载全部数据 --</div>
            )}
          </div>
        ) : (
          <div className="no-result">未搜寻到相关app～</div>
        )}
      </div>
    );
  }
}

export default App;
