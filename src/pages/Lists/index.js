import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import InsertList from '../../components/InsertList';
import InsertTask from '../../components/InsertTask';
import { Container, Checkbox, FormControl, FormGroup, FormControlLabel, Grid } from '@material-ui/core';
import api from '../../services/taskListService';
import apiTask from '../../services/taskService';
import './styles.css';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { FiTrash } from 'react-icons/fi';

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function Lists() {
    const [token] = useState(localStorage.getItem('token'));
    const [taskList, setTaskList] = useState([]);
    const [taskListError, setTaskListError] = useState([]);
    const [taskError, setTaskError] = useState([]);
    const [taskDeleteError, setTaskDeleteError] = useState([]);
    const history = useHistory();

    useEffect(() => {
        async function fetchDataList() {
            const response = await api.list(token);
            setTaskList(response.data);
        }
        fetchDataList();

    }, [token]);

    async function onInsertList(data) {
        try {
            const response = await api.store(token, data);
            setTaskList([...taskList, response.data]);
        } catch (error) {
            if (error.status && error.status === (401 || 498)) {
                localStorage.clear();
                history.push('/');
            }
            setTaskListError(error.message);
        }
    }

    async function onInsertTask(data) {
        try {
            const response = await apiTask.store(token, data);
            if (response.data.status !== false) {
                const list = await api.list(token);
                setTaskList(list.data);
            } else {
                if (response.data.status && response.data.status === (401 || 498)) {
                    localStorage.clear();
                    history.push('/');
                }

                if (response.data.errors.title) {
                    setTaskError(response.data.errors.title);
                }

                if (response.data.errors.list_id) {
                    setTaskError(response.data.errors.list_id);
                }
            }

        } catch (error) {
            if (error.status && error.status === (401 || 498)) {
                localStorage.clear();
                history.push('/');
            }
            setTaskError(error.message);
        }
    }

    //ações para as tarefas
    const handleChange = async (event) => {
        event.preventDefault();
        const taskId = parseInt(event.target.value);

        const response = await apiTask.check(token, taskId);

        setTaskList(response.data);

    };

    const handleDelete = async (task) => {
        try {
            const response = await apiTask.delete(token, task);
            if (response) {
                const list = await api.list(token);
                setTaskList(list.data);
            }

        } catch (error) {
            if (error.status && error.status === (401 || 498)) {
                localStorage.clear();
                history.push('/');
            }
            setTaskDeleteError(error.message);
        }
    }

    return (
        <React.Fragment>
            <Header />
            <Container maxWidth="xl">
                <Grid container>
                    <Grid item xs={12} md={3}>
                        <span className='span_error'>{taskListError}</span>
                        <InsertList onInsertList={onInsertList} />
                        <span className='span_error'>{taskError}</span>
                        <InsertTask onInsertTask={onInsertTask} taskList={taskList} />
                    </Grid>

                    <Grid item xs={12} md={9}>
                        <Grid container>
                            {taskList.length > 0 ? taskList.map((list) =>
                            (
                                <Grid item xs={12} md={4} key={list.id}>
                                    <div className="ListContainer">
                                        <div className="ListHeader">
                                            {list.status === "À Fazer" ? (
                                                <h3 className="ListTitle">{list.title}</h3>
                                            ) : (
                                                <h3 className="ListTitle">{list.title} - Finalizado</h3>
                                            )}
                                        </div>
                                        <span className='span_error'>{taskDeleteError}</span>
                                        <div className="Taks">
                                            <div className="TaskItem">
                                                {list.task.length > 0 ? list.task.map((task) =>
                                                (
                                                    <Grid container key={task.id}>
                                                        <Grid item xs={10}>
                                                            <FormControl component="fieldset">
                                                                <FormGroup aria-label="position" row>
                                                                    <FormControlLabel
                                                                        value={task.id}
                                                                        control={<GreenCheckbox checked={task.status === 2 ? false : true} onChange={handleChange} />}
                                                                        label={task.title}
                                                                        labelPlacement="end"
                                                                    />
                                                                </FormGroup>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <FiTrash className="floatRight deleteIcon" onClick={() => handleDelete(task.id)} size={18} />
                                                        </Grid>
                                                    </Grid>

                                                )) : null}
                                            </div>
                                        </div>
                                    </div>
                                </Grid>

                            )) : null
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
}