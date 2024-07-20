import axios from "axios";
import NProgress from "nprogress";
import { store } from "../../redux/store"


NProgress.configure({
  showSpinner: false,// = false tắt loading spin
  trickleSpeed: 100, // state run
  easing: "ease",
})

const instance = axios.create({
  baseURL: 'http://localhost:8081/',
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // console.log("check state store :", store.getState());
  // lấy state từ store .getState()
  const access_token = store?.getState()?.user.account?.access_token
  // search how to get redux state outside component
  // lấy access_token từ state store 
  config.headers.Authorization = `Bearer ${access_token}`
  NProgress.start(); // loading bar
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  NProgress.done();
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response && response.data ? response.data : response;
}, function (error) {
  NProgress.done();
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return error && error.response && error.response.data ? error.response.data
    : Promise.reject(error);
});

export default instance 