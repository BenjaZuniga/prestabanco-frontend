import axios from "axios";

export default axios.create({
    baseURL: `http://74.179.60.49:80`,
    headers: {
        'Content-Type': 'application/json'
    }
});