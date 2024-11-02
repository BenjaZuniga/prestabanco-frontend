import httpClient from "../http-common";

const getAll = () => {
	return httpClient.get("/api/requests/");
}

const create = data => {
	return httpClient.post("/api/requests/", data);
}

const get = id => {
    return httpClient.get(`/api/requests/${id}`)
}

const getByOwnerId = ownerId => {
	return httpClient.get(`/api/requests/findByOwnerId/${ownerId}`)
}

const simulateCredit = ({ amount, interestRate, months }) => {
	return httpClient.get(`/api/requests/simulateCredit/`, {params: { amount, interestRate, months },})
}

const update = data => {
	return httpClient.put(`/api/requests/`, data)
}

const remove = id => {
	return httpClient.delete(`/api/requests/${id}`)
}
export default {getAll, get, create, getByOwnerId, simulateCredit, update, remove}