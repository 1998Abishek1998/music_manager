import request from './request'

const url = 'http://localhost:3000/api' || '/api'

export const bearerTest = () => request('GET', `${url}/v1`, true);

export const login = (body) => request('POST', `${url}/auth/login`, false, body);
export const register = (body) => request('POST', `${url}/auth/register`, false, body);
export const createSong = (body) => request('POST', `${url}/v1/musics`, true, body)

export const fetchUsersList = (params) => request('GET', `${url}/v1/users`, true, params)
export const fetchArtistsList = (params) => request('GET', `${url}/v1/artists`, true, params)
export const fetchMusicsList = (params) => request('GET', `${url}/v1/musics`, true, params)
export const fetchSingleMusic = (id) => request('GET', `${url}/v1/musics/${id}`, true)

export const updateUser = (param, id) => request('PUT', `${url}/v1/users/${id}`, true, param)
export const updateArtist = (param, id) => request('PUT', `${url}/v1/artists/${id}`, true, param)
export const updateMusic = (param, id) => request('PUT', `${url}/v1/musics/${id}`, true, param)

export const deleteUser = (id) => request('DELETE', `${url}/v1/users/${id}`, true)
export const deleteArtist = (id) => request('DELETE', `${url}/v1/artists/${id}`, true)
export const deleteMusic = (id) => request('DELETE', `${url}/v1/musics/${id}`, true)

export const fetchSingleArtist = (id, params) => request('GET', `${url}/v1/artists/${id}`, true, params)
export const fetchArtistsCsv = () => request('GET', `${url}/v1/artists/export-csv`, true, {}, true)
