import React, {useState} from 'react'
import axios from 'axios'
import {Redirect, Link} from 'react-router-dom'
import { token$, updateToken } from '../store'
import styled from 'styled-components'

const Formbox = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    background: #fff;
    width: 285px;
    margin: -140px 0 0 -182px;
    padding: 40px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
`;

const Logintitle = styled.h4`
    margin: 0 0 20px;
    line-height: 1;
    color: #44c4e7;
    font-size: 18px;
    font-weight: 400;
`;

const Inputbox = styled.input`
    outline: none;
    display: block;
    width: 100%;
    margin: 0 0 20px;
    padding: 10px 15px;
    border: 1px solid #ccc;
    color: #ccc;
    font-family: "Roboto";
    box-sizing: border-box;
    font-size: 14px;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: 0.2s linear;
    :focus {
        color: #333;
        border: 1px solid #44c4e7;
    }
`;

const Loginbutton = styled.button`
    cursor: pointer;
    background: #44c4e7;
    width: 100%;
    padding: 10px 15px;
    border: 0;
    color: #fff;
    font-family: "Roboto";
    font-size: 14px;
    font-weight: 400;
    &:hover {
        background: #369cb8;
    }
`;

const Login = () => {
    const [token] = useState(token$.value)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [toHome, setToHome] = useState(false)

    const handleSubmit = (e) =>{
        e.preventDefault()
        let source = axios.CancelToken.source()
        axios.post('http://localhost:3001/sessions/create', { username, password }, { headers: { Authorization: "Bearer " + token }}, {cancelToken: source.token})
        .then((res) => {
            //console.log(res.config.data);
            updateToken(res.data.access_token); // Token
            window.localStorage.setItem("token", res.data.token)  // Saving token in localStorage
            setToHome(true)
            setUsername([])
            setPassword([])
        })
        .catch((err) => {
            if (!axios.isCancel(err)) {
            setError(err.message);
            //setError(err.response.data.message)
            setUsername([])
            setPassword([])
            }
        });
        return () =>{source.cancel()}
    }
    return (
        <Formbox>
            <Logintitle>Login To Your Account</Logintitle>
            {toHome ? <Redirect to="/protected" /> : null}
            <div style={{color:'red'}}>{error && <div><b>Unauthorized User - {error}</b></div>}</div>
            <form onSubmit={handleSubmit}>
                <Inputbox type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <Inputbox type="password" placeholder="................." value={password} onChange={(e) => setPassword(e.target.value)} required />
                <Loginbutton>LOGIN</Loginbutton>
            </form><br />
                <p>Not a member? <Link to="register">Create Account</Link></p>
        </Formbox>
    )
}

export default Login;
