import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/logonService';
import './styles.css';

export default function Logon() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorLogin, setErrorLogin] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        const response = await api.login({ email, password });
        if (response.status === true) {
            localStorage.setItem('token', response.msg);
            history.push('/lists');
        } else {
            setErrorLogin(response.error)
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <span className='span_error'>{errorLogin}</span>
                <form onSubmit={handleLogin}>
                    <input
                        placeholder="Seu e-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <input
                        placeholder="Sua Senha"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />

                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#3498db" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
        </div>
    );
}