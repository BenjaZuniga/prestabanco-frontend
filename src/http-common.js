import axios from "axios";

export default axios.create({
    baseURL: `http://prestabanco-benjazuniga.westus2.cloudapp.azure.com`,
    headers: {
        'Content-Type': 'application/json'
    }
});