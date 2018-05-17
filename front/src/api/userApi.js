import {doRequest} from './base'

const USER_PATH = "/api/user";
const AUTHENTICATION_PATH = "/login";

export const getSessionUser = () => {
     return doRequest(USER_PATH)
    .then(response => response.json());
}

export const authenticate = (username, password) => {
     return doRequest(AUTHENTICATION_PATH, {
	    method: 'post',
	    headers: {
	      'Content-Type': 'application/x-www-form-urlencoded'
	    },
	    body: loginParams({username, password})
	 });
}

const loginParams = (params) => Object.keys(params).map((key) => {
  return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
}).join('&');