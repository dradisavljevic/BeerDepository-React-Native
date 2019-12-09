import axios from 'axios';
import { CLIENT_ID } from '../constants/authorization';

/**
 * Imgur API through axios library. BaseURL is that to Imgur album, while header should have
 * Client-ID authorization.
 */
export default axios.create({
  baseURL: 'https://api.imgur.com/3/album',
  headers: {
    Authorization: `Client-ID ${CLIENT_ID}`
  }
});
