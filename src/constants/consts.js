import { Dimensions, NativeModules, Platform } from "react-native";
const { StatusBarManager } = NativeModules;

/** dimensions */
export const STATUS_BAR_HEIGHT = StatusBarManager.HEIGHT;
export const SCREEN_WIDTH = Dimensions.get("screen").width;
export const SCREEN_HEIGHT = Dimensions.get("screen").height;
export const WINDOW_WIDTH = Dimensions.get("window").width;
export const WINDOW_HEIGHT = Dimensions.get("window").height;

/** platform */
export const IS_ANDROID = Platform.OS == "android";
export const IS_IOS = Platform.OS == "ios";

/**  */
export const DEBOUNCE_TIME = 400;
export const PAGE_LIMIT = 10;

/** URL */
export const GOOGLE_WEB_CLIENT_ID =
  "319062689013-fku6m54vf3arbhrnoiij84qb0e852o28.apps.googleusercontent.com";

export const BASE_URL = "https://fbus-swp.azurewebsites.net/api/";

export const DATABASE_PATHS = {
  LOCATIONS: "locations",
};
