import Vue from 'vue';

import './config/filters'

import router from './config/router'

import  './config/plugins'

import app from './app.vue';




let vm=new Vue({
    el:'#app',
    router,
    render: c=>c(app),
    created(){
        // 设置axios的拦截器
    // 发送请求之前
    // Add a request interceptor
    this.axios.interceptors.request.use(function (config) {
        // console.log(this);
        // Do something before request is sent
        this.$indicator.open('正在加载...');
        return config;
      }.bind(this), function (error) {
        // Do something with request error
        return Promise.reject(error);
      });
  
      // Add a response interceptor
      this.axios.interceptors.response.use(function (response) {
        // Do something with response data
        this.$indicator.close();
        
        return response;
      }.bind(this), function (error) {
        // Do something with response error
        return Promise.reject(error);
      });
    }
})