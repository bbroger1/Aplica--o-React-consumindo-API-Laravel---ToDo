import React, { useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import ReCAPTCHA from 'react-google-recaptcha';

import api from '../../services/logonService';
import './styles.css';

export default function Logon() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorLogin, setErrorLogin] = useState('');
    const history = useHistory();

    const [captchaValid, setCaptchaValid] = useState();
    const captcha = useRef(null);

    const onChange = () => {
        if (captcha.current.getValue()) {
            setCaptchaValid(true);
            setErrorLogin('')
        };
    };

    async function handleLogin(e) {
        e.preventDefault();

        if (captchaValid) {
            const response = await api.login({ email, password });
            if (response.status === true) {
                localStorage.setItem('token', response.message);
                history.push('/lists');
            } else {
                setErrorLogin(response.error)
            }
        } else {
            setErrorLogin('Por favor marque a caixa acima.')
        }

    }

    return (
        <div className="logon-container">

            <section className="form">
                <h1 align='center'>Minhas Tarefas</h1>
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

                    <ReCAPTCHA
                        ref={captcha}
                        sitekey="6LehGEAdAAAAAIENu6ospbeZEFCYi_sLaPDVrhez"
                        onChange={onChange}
                    />

                    <span className='span_error'>{errorLogin}</span>

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