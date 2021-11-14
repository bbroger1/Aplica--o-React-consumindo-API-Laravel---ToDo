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
        .catch(error => { return error; })

    return res;
}

export default tasklist;