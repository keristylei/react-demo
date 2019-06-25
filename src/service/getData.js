import fetch from './fetch';

// 请求App recommendation数据

// 请求App List 数据
export const getAppListData = () => {
  const paramData = null;
  return fetch('/hk/rss/topfreeapplications/limit=100/json', paramData, 'post');
};
