import React, {useState} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import { token$, updateToken } from '../store'

const Login = () => {
    const [token] = useState(token$.value)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [toHome, setToHome] = useState(false)

    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.post('http://localhost:3001/sessions/create', { username, password }, { headers: { Authorization: "Bearer " + token }})
        .then((res) => {
            console.log(res.data);
            updateToken(res.data.token); // Token
          window.localStorage.setItem("token", res.data.token)  // Saving token in localStorage
            setToHome(true)
            setUsername([])
            setPassword([])
        })
        .catch((err) => {
            setError(err.message);
            //setError(err.response.data.message)
        }); 
    }
    return (
        <div>
            <h4>Login</h4>
            {toHome ? <Redirect to="/home" /> : null}
            <div style={{color:'red'}}>{error && <div>Register: Please fill in all the fields - <b>{error}</b></div>}</div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username...." value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password...." value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button>Login</button>
            </form>
        </div>
    )
}

export default Login;
