import { BASE_URL, SCREENS } from "@/constants";
import { removeUser, store } from "@/redux";
import axios from "axios";
import * as RootNavigation from '../navigation/root-navigator' 

const TIME_OUT = 90000;
// cau hinh axios by Intercreptor: de bao mat
export const publicAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: TIME_OUT,
});

export const protectedAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: TIME_OUT,
});


publicAxios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

publicAxios.interceptors.response.use(
  function (response) {
    const responseObj = {
      ...response.data,
      statusCode: response.status,
    };

    return responseObj;
  },
  function (error) {
    return Promise.reject(error);
  }
);

protectedAxios.interceptors.request.use(
  function (config) {
    const accessToken = store.getState().user?.userInfor?.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

protectedAxios.interceptors.response.use(
  function (response) {
    const responseObj = {
      ...response.data,
      statusCode: response.status,
    };

    return responseObj;
  },
  function (error) {
    if(error.response.status == 401){
      store.dispatch(removeUser());
      RootNavigation.navigate(SCREENS.LOGIN)
    }
    return Promise.reject(error);
  }
);
//thac mac
