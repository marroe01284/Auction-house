import { API_AUTH_LOGIN } from './constants.js';
console.log(API_AUTH_LOGIN);
import { apiPost } from '../modules/utils.js';


//Login

export async function apiLogin({ email, password }) {
    return await apiPost(API_AUTH_LOGIN, { email, password });
  }


  //accsess token
  export async function getKey() {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        console.error("Access token not found in localStorage.");
        return null;  
    }
    return accessToken;
}
//register
export async function register({
    name,
    email,
    password,
    bio,
    banner,
    avatar,
  }) {}