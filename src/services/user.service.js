import httpClient from "../http-common";

const getAll = () => {
	return httpClient.get("/api/users/");
}

const create = data => {
	return httpClient.post("/api/users/", data);
}

const get = id => {
    return httpClient.get(`/api/users/${id}`)
}

const existsByMail = mail => {
	return httpClient.get(`/api/users/existsByMail/${mail}`)
}

const getByMail = mail => {
	return httpClient.get(`/api/users/findByMail/${mail}`)
}

const update = data => {
	return httpClient.put(`/api/users/`, data)
}

const remove = id => {
	return httpClient.delete(`/api/users/${id}`)
}
export default {getAll, get, create, existsByMail, getByMail, update, remove}