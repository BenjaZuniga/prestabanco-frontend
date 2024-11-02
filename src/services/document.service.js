import httpClient from "../http-common";

const getAll = () => {
	return httpClient.get("/api/documents/");
}

const create = data => {
	return httpClient.post("/api/documents/", data, {
		headers: {
		  'Content-Type': 'multipart/form-data',  // Indicamos que estamos enviando un formulario con archivos
		},
	});
}

const get = id => {
    return httpClient.get(`/api/documents/${id}`)
}

const getByRequestId = ownerId => {
	return httpClient.get(`/api/documents/findByRequestId/${ownerId}`)
}

const update = data => {
	return httpClient.put(`/api/documents/`, data)
}

const remove = id => {
	return httpClient.delete(`/api/documents/${id}`)
}
export default {getAll, create, getByRequestId, update, remove}