import {Dimensions, NativeModules, Platform} from 'react-native';
const {StatusBarManager} = NativeModules;

/** dimensions */
export const STATUS_BAR_HEIGHT = StatusBarManager.HEIGHT;
export const SCREEN_WIDTH = Dimensions.get('screen').width;
export const SCREEN_HEIGHT = Dimensions.get('screen').height;
export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;

/** platform */
export const IS_ANDROID = Platform.OS == 'android';
export const IS_IOS = Platform.OS == 'ios';

/**  */
export const DEBOUNCE_TIME = 400;
export const PAGE_LIMIT = 10;

/** URL */
export const GOOGLE_WEB_CLIENT_ID =
  '737489797165-gmopsvfcnpm45qumgjt861ldvtsa7k7h.apps.googleusercontent.com';

export const BASE_URL = 'https://fbus-swp.azurewebsites.net/api/';
