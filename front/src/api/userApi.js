import {baseUrl} from './config';

const USER_PATH = "/user";

export const getSessionUser = (handleAuthentication) => {
     return fetch(baseUrl() + USER_PATH)
    .then(response => response.json());
}