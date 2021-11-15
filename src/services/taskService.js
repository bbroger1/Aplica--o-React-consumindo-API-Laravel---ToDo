import axios from 'axios';

const baseUrl = "http://tarefas.test/api/v1";
const task = {};

task.store = async (token, data) => {
    const urlStore = baseUrl + "/tasks"
    const res = await axios.post(urlStore, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
        .then(response => { return response.data; })
        .catch(error => { return error.response; })

    return res;
}

task.list = async (token, list) => {
    const urlList = baseUrl + '/tasklist/' + list + '/tasks'
    const res = await axios.get(urlList, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
        .then(response => { return response.data; })
        .catch(error => { return error.response; })

    return res;
}

task.delete = async (token, task) => {
    const urlTask = baseUrl + '/tasks/' + task;
    const res = await axios.delete(urlTask, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
        .then(response => { return response.data; })
        .catch(error => { return error.response; })

    return res;
}

task.check = async (token, taskId) => {
    const urlCheck = baseUrl + '/task/close/' + taskId;
    const res = await axios.put(urlCheck, '', {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
        .then(response => { return response.data; })
        .catch(error => { return error.response; })

    return res;
}

export default task;