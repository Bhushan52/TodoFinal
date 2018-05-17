const USER_PATH = "/user";

export const getSessionUser = (handleAuthentication) => {
     return fetch(REACT_ + USER_PATH)
    .then(response => response.json());
}