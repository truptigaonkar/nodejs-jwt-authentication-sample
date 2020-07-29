import React, {useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import './Register.css'

const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [extra, setExtra] = useState('')
    const [error, setError] = useState(false)
    const [message, setMessage] = useState('')
    
    const handleRegister = (e) =>{
        e.preventDefault()
        let source = axios.CancelToken.source()
        axios.post('http://localhost:3001/users',  { username, password, extra }, {cancelToken: source.token})
        .then((res) => {
            console.log(res.data);
            //window.localStorage.setItem("token", res.data.token)  // Saving token in localStorage
            setUsername([])
            setPassword([])
            setExtra([])
            setMessage('Registered successfully. Please login....')
        })
        .catch((err) => {
            if (!axios.isCancel(err)) {
                console.log(err)
            setError(err.message);
            //setError(err.response.data.message)
            setUsername([])
            setPassword([])
            setExtra([])
            }
        });
        return () =>{source.cancel()}
    }

    return (
        <div className="register-page">
            <div className="form-box">
            <h4 className="register-title">Register</h4>
            <div style={{color:'red'}}>{error && <div><b>REGISTER: User already exists - {error}</b></div>}</div>
            <p style={{color:'green'}}>{message}</p>
            <form onSubmit={handleRegister}>
                <input className="input-box" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                <input className="input-box" type="password" placeholder="................." value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <input className="input-box" type="text" placeholder="Extra" value={extra} onChange={(e) => setExtra(e.target.value)} required/>
                <button className="register-button">REGISTER</button>
                <p>Already member? <Link to="/">Login to Account</Link></p>
            </form>
            </div>
        </div>
    )
}

export default Register;
