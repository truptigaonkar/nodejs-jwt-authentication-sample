import React, {useState} from 'react'
import axios from 'axios'
import {Redirect, Link} from 'react-router-dom'
import { token$, updateToken } from '../store'
import './Login.css'

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
        <div className="login-page">
            <div className="form-box">
                <h4 className="login-title">Login To Your Account</h4>
                {toHome ? <Redirect to="/home" /> : null}
                <div style={{color:'red'}}>{error && <div><b>Unauthorized User - {error}</b></div>}</div>
                <form onSubmit={handleSubmit}>
                    <input className="input-box" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <input className="input-box" type="password" placeholder="................." value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button className="login-button">LOGIN</button>
                </form><br />
                <p>Not a member? <Link to="register">Create Account</Link></p>
            </div>
        </div>
    )
}

export default Login;
