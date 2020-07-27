import React, {useState} from 'react'
import axios from 'axios'

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
            }
        });
        return () =>{source.cancel()}
    }

    return (
        <div>
            <h4>Register</h4>
            <div style={{color:'red'}}>{error && <div><b>REGISTER: User already exists - {error}</b></div>}</div>
            <p style={{color:'green'}}>{message}</p>
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <input type="text" placeholder="Extra" value={extra} onChange={(e) => setExtra(e.target.value)} required/>
                <button>REGISTER</button>
            </form>
        </div>
    )
}

export default Register;
