const api = `https://api.github.com/`;
const client = `&client_id=5143e07630c59831276d&client_secret=0113b575641cbb458ae80ec28a96a67ccd665a73`;

const axios = require('axios');

export function searchUsers(search, callback) {
    return axios.get(`${api}search/users?q=${search}&per_page=5${client}`).then(function(response) {
        callback(response.data)
    }).catch(function(error) {
        console.error(error);
    });
}

//Realizo a validação se existe um usuário pesquisado
export function getUserData(data, callback) {
    axios.get(`${api}users/${data}?${client}`).then(function(response){
        callback(response.data);
    }
    ).catch(function(error) {
        console.error(error);
    });
}

//Trago os usuários está seguindo
export function getUserFollowing(data, callback) {
    axios.get(`${api}users/${data}/following?${client}`).then(function(response) {
        callback(response.data);
    }).catch(function(error) {
        console.error(error);
    });
}

//Trago os usuários que o seguem
export function getUserFollowers(data, callback) {
    axios.get(`${api}users/${data}/followers`).then(function(response) {
        callback(response.data);
    }).catch(function(error) {
        console.error(error)
    });
}

//Trago os repositórios do usuário
export function getUserRepos(data, callback) {
    axios.get(`${api}users/${data}/repos?${client}`).then(function(response) {
        callback(response.data)
    }).catch(function(error) {
        console.error(error)
    });
}
