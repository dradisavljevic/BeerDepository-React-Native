import { create, ApisauceInstance, ApiErrorResponse } from 'apisauce';
import Reactotron from 'reactotron-react-native';
import globals from '../constants/globals';

const AUTHORIZATION_HEADER_NAME = 'Authorization';
const authorizationUrls = ['/sign-in', '/refresh-token'];

export const network: ApisauceInstance = create({
  baseURL: 'https://api.imgur.com/3/album'
});

export const setAccessToken = (accessToken: string) =>
  network.setHeader(AUTHORIZATION_HEADER_NAME, `Client-ID ${accessToken}`);

export const removeAccessToken = () => network.deleteHeader(AUTHORIZATION_HEADER_NAME);

export const getErrorMessage = (response: ApiErrorResponse<any>) => response.data && response.data.message;

const isAuthorizationUrl = (url: string) => authorizationUrls.some(u => url.endsWith(u));

network.addRequestTransform(request => {
  if (isAuthorizationUrl(request.url || '')) {
    removeAccessToken();
  }
});

if (globals.useReactotron) {
  // @ts-ignore
  network.addMonitor(Reactotron.apisauce);
}
