import axios from 'axios';

const baseUrl = "http://tarefas.test/api";
const logon = {};

logon.login = async (data) => {
    const urlLogin = baseUrl + "/login"
    const res = await axios.post(urlLogin, data)
        .then(response => { return response.data })
        .catch(error => { return error.response.data })

    return res;
}

export default logon;