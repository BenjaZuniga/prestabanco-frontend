const log = (id, role) => {
	localStorage.setItem("idUser", user.id);
	localStorage.setItem("role", user.role);
	localStorage.setItem("logged", 1);
}

const isLogged = () => {
	if(localStorage.getItem("logged") === 1){
		return true;
	}
	return false;
}

const getRole = () => {
	return localStorage.getItem("role");
}

const getId = () => {
	return localStorage.getItem("id");
}


export default {log, isLogged, getRole, getId}