import { store } from '../store'
import axios from "axios";
import Vue from 'vue'
const vue = new Vue({})
const showError = res => {
  switch (res.status) {
    case 401:
      vue.$swal.fire({
        icon: ' error',
        title: "Chưa đăng nhập"
      })
      break;
    case 1000:
      vue.$swal.fire({
        icon: "error",
        title: "Lỗi Kết Nối Server"
      });
      break;
    case 500:
      vue.$swal.fire({
        icon: "error",
        title: `Lỗi Server. Vui Lòng báo cho Admin.!`
      });
      break;
    case 400:
      if (res && res.data && res.data.isActive === false) {
        return;
      }
      vue.$swal.fire({
        icon: "error",
        title: `${res.data.message ? res.data.message : ""}`
      });
      break;
    case 404:
      vue.$swal.fire({
        icon: "error",
        title: `Không tìm thấy API`
      });
      break;
    case 403:
      vue.$swal.fire({
        icon: "error",
        title: `Đã Tồn Tại !`
      });
      break;

    default:
      vue.$swal.fire({
        icon: "error",
        title: "Lỗi"
      });
      break;
  }
}

export default class api {
  static post = async (url, data, exConfig) => {
    let config = {
      baseURL: process.env.VUE_APP_API,
      headers: {
        Authorization: `Bearer ${store.state.token}`
      },
      timeout: 10000
    }
    var newConfig = { ...config, ...exConfig }
    newConfig.headers = {
      ...newConfig.headers,
      ...{
        Authorization: `Bearer ${store.state.token}`

      }
    }
    var res = {};
    try {
      res = await axios.post(url, data, newConfig)
    } catch (error) {
      res = error.response
    }
    if (
      !res ||
      (!res.status &&
        !(res.data && res.data.status) &&
        !(
          res.error &&
          res.error.response &&
          (res.error.response.status || res.error.response.data.status)
        ))
    ) {
      res = {
        status: 1000,
        message: "Netword Error.!"
      };
    }

    if (res.status != 200) showError(res)
    return res
  };
  static get = async (url, exConfig) => {
    let config = {
      baseURL: process.env.VUE_APP_API,
      headers: {
        Authorization: "Bearer " + store.state.token
      },
      timeout: 10000
    };
    var newConfig = { ...config, ...exConfig };

    var res = {};
    try {
      res = await axios.get(url, newConfig);
    } catch (err) {
      res = err.response;
    }

    // Check network error
    if (
      !res ||
      (!res.status &&
        !(res.data && res.data.status) &&
        !(res.error && res.error.response && res.error.response.data.status))
    ) {
      res = {
        status: 1000,
        message: "Netword Error.!"
      };
    }
    if (res.status != 200) {
      showError(res);
    }
    return res;
  };
  static patch = async (url, data, exConfig) => {
    let config = {
      baseURL: process.env.VUE_APP_API,
      headers: {
        Authorization: "Bearer " + store.state.token
      },
      timeout: 10000
    };
    var newConfig = { ...config, ...exConfig };
    var res = {};
    try {
      res = await axios.patch(url, data, newConfig);
    } catch (err) {
      res = err.response;
    }

    // Check network error
    if (
      !res ||
      (!res.status &&
        !(res.data && res.data.status) &&
        !(res.error && res.error.response && res.error.response.data.status))
    ) {
      res = {
        status: 1000,
        message: "Netword Error.!"
      };
    }
    if (res.status != 200) {
      showError(res);
    }
    return res;
  }
  static delete = async (url, exConfig) => {
    let config = {
      baseURL: process.env.VUE_APP_API,
      headers: {
        Authorization: "Bearer " + store.state.token
      },
      timeout: 10000
    };
    var newConfig = { ...config, ...exConfig };
    var res = {};
    try {
      res = await axios.delete(url, newConfig);
    } catch (err) {
      res = err.response;
    }

    // Check network error
    if (
      !res ||
      (!res.status &&
        !(res.data && res.data.status) &&
        !(res.error && res.error.response && res.error.response.data.status))
    ) {
      res = {
        status: 1000,
        message: "Netword Error.!"
      };
    }
    if (res.status != 200) {
      showError(res);
    }
    return res;
  }
}
