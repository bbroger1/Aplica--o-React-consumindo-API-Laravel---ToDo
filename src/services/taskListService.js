import axios from 'axios';

const baseUrl = "http://tarefas.test/api/v1";
const tasklist = {};

tasklist.list = async (token) => {
    const urlList = baseUrl + "/tasklist"
    const res = await axios.get(urlList, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
        .then(response => { return response.data; })
        .catch(error => { return error.response; })

    return res;
}

tasklist.store = async (token, data) => {
    const urlList = baseUrl + "/tasklist"
    const res = await axios.post(urlList, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
        .then(response => { return response.data; })
        .catch(error => { return error.response; })

    return res;
}

export default tasklist;