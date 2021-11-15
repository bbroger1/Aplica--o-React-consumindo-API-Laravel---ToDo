import React, { useState } from 'react';
import { TextField } from '@material-ui/core';

export default function InsertList({ onInsertList }) {
    const [listName, setListName] = useState("");
    const [listNameError, setListNameError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!listName) {
            setListNameError('Preencha o título');
        } else {
            await onInsertList({
                "title": listName,
                "status": 2
            });

            setListName("");
        }

    };

    return (
        <div className="form">
            <strong>Cadastrar Lista</strong>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                    name="listName"
                    id="listName"
                    label="Titulo da Lista de Tarefas"
                    className="TextFieldBlock"
                    value={listName}
                    onChange={e => setListName(e.target.value)}
                    required
                />
                <span className='span_error'>{listNameError}</span>
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
}