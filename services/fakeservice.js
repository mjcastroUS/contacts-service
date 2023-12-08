const axios = require('axios');
const urlJoin = require('url-join');
const debug = require('debug')('contacts-service:fake-social');

const FAKE_SOCIAL_SERVICE = process.env.FAKE_SOCIAL_SERVICE || 'http://localhost:3333';
const API_VERSION = "/api/v1";

//codigo de acceso, funcion asincrona
const getSocial = async function(name){
    try{
        const url = urlJoin(FAKE_SOCIAL_SERVICE, API_VERSION, '/social', name);
        const response = await axios.get(url) ; // variable espera la respuesta de axios
        debug(response);
        return response.data;
    }catch (error){
        console.error(error);
        return null;
    }
}

module.exports = {
    "getSocial": getSocial
}