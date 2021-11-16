import axios from 'axios';

const baseUrl = "http://tarefas.test/api";
const register = {};

register.store = async (data) => {
    const urlRegister = baseUrl + "/register"
    const res = await axios.post(urlRegister, data)
        .then(response => { return response.data; })
        .catch(error => { return error.response; })

    return res;
}

export default register;