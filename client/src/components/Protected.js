import React, {useState, useEffect} from 'react'
import axios from 'axios'
import jwt from "jsonwebtoken"
import { token$, updateToken } from '../store'
import { Redirect, Link } from 'react-router-dom';
import Logout from './Logout';

const Protected = () => {
    const [toLogin, setToLogin] = useState(false)
    const [error, setError] = useState(false)
    const [protectedQuote, setProtectedQuote] = useState('')
    const [token] = useState(token$.value)

    // Protected route
    useEffect(() => {
        let source = axios.CancelToken.source()
        axios.get('http://localhost:3001/api/protected/random-quote', 
        {   cancelToken: source.token,
            headers: { Authorization: "Bearer " + token }
        })
        .then((res) => {
          console.log(res);
          setProtectedQuote(res.data)
        })
        .catch((err) => {
            if (!axios.isCancel(err)) {
                setError(err.message);
                //setError(err.response.data.message)
            }
            updateToken(null);
        });
        return () =>{source.cancel() }
    }, [token]);

    const getEmail = (access_token) => {
        //if we do not have access to 'secret-key' then funk / decode (token) get info
        const decoded = jwt.decode(access_token);
        //console.log(decoded)
        return decoded.sub;
    }
    
    return (
        <div style={{borderBottom:'1px solid black', marginTop:'10px'}}>
            {toLogin ? <Redirect to="/" /> : null}
            {protectedQuote ? (
                <>
                    <h3>Protected Quote</h3>
                    <div style={{color:'red'}}>{error && <div>Protected: <b>Unauthorized User</b> - {error}</div>}</div>
                    Login by: <span style={{color:'blue'}}>{getEmail(token)}</span><Logout />
                    <p>{protectedQuote}</p>
                </>
            ) : (
                <span style={{color:'red'}}>Unauthorized protected route... Please <Link to="/">LOGIN</Link> first to see protected Quote....</span>
              )} 
        </div>
    )
}

export default Protected;
