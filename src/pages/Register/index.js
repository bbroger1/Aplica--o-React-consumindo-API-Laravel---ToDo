import React, { useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import ReCAPTCHA from 'react-google-recaptcha';

import api from '../../services/registerService';
import apiLogon from '../../services/logonService';
import './styles.css';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorRegister, setErrorRegister] = useState('');
    const [errorCaptcha, setErrorCaptcha] = useState('');

    const history = useHistory();

    const [captchaValid, setCaptchaValid] = useState();
    const captcha = useRef(null);

    const onChange = () => {
        if (captcha.current.getValue()) {
            setCaptchaValid(true);
            setErrorCaptcha('');
        };
    };

    async function handleRegister(e) {
        e.preventDefault();

        if (captchaValid) {
            const data = {
                "name": name,
                "email": email,
                "password": password,
                "password_confirmation": confirmPassword,
            };

            const response = await api.store(data);

            if (response.status === true) {
                const responseLogin = await apiLogon.login({ email, password });

                localStorage.setItem('token', responseLogin.message);
                history.push('/lists');
            } else {
                setErrorRegister(response.data.errors);
            }
        } else {
            setErrorCaptcha('Por favor marque a caixa acima.')
        }

    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e organize a suas tarefas.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#3498db" />
                        Já possuo cadastro
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input
                        placeholder="Seu Nome"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                    <span className="span_error">{errorRegister.name}</span>

                    <input
                        type="email"
                        placeholder="Seu E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <span className="span_error">{errorRegister.email}</span>
                    <input
                        placeholder="Digite sua Senha"
                        value={password}
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <span className="span_error">{errorRegister.password}</span>

                    <input
                        placeholder="Confirme sua Senha"
                        value={confirmPassword}
                        type="password"
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                    />

                    <ReCAPTCHA
                        ref={captcha}
                        sitekey="6LehGEAdAAAAAIENu6ospbeZEFCYi_sLaPDVrhez"
                        onChange={onChange}
                    />
                    <span className='span_error'>{errorCaptcha}</span>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}