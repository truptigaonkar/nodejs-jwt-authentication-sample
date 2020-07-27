import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { token$, updateToken } from '../store'
import { Redirect } from 'react-router-dom';

const Home = () => {
    const [toLogin, setToLogin] = useState(false)
    const [error, setError] = useState(false)
    const [quote, setQuote] = useState('')
    const [protectedQuote, setProtectedQuote] = useState('')
    const [token] = useState(token$.value)

    // Unprotected route
    useEffect(() => {
        let source = axios.CancelToken.source()
        axios.get('http://localhost:3001/api/random-quote')
        .then((res) => {
            //console.log(res.data);
            setQuote(res.data)
        })
        .catch((err) => {
            if (!axios.isCancel(err)) {
                setError(err.message);
            }
        });
        return () =>{ source.cancel()}
    }, []);

    // Protected route
    useEffect(() => {
        let source = axios.CancelToken.source()
        axios.get('http://localhost:3001/api/protected/random-quote', 
        {   cancelToken: source.token,
            headers: { Authorization: "Bearer " + token }
        })
        .then((res) => {
          //console.log(res.data);
          setProtectedQuote(res.data)
        })
        .catch((err) => {
            if (!axios.isCancel(err)) {
                setError(err.message);
            }
            updateToken(null);
        });
        return () =>{source.cancel() }
    }, [token]);

    const handleLogout = (e) =>{
        e.preventDefault();
        updateToken(null);
        window.localStorage.clear();
        setToLogin(true)
    }
    
    return (
        <div>
            <h4>Home</h4>
            <div style={{color:'red'}}>{error && <div>Login: <b>{error}</b></div>}</div>
            {toLogin ? <Redirect to="/" /> : null}
            <h3>Unprotected Quote</h3>
            <p>{quote}</p>
            <h3>Protected Quote</h3>
            {protectedQuote ? (
                <>
                    <button onClick={handleLogout}>Logout</button>
                    <p>{protectedQuote}</p>
                </>
            ) : (
                <b>Unauthorized protected route... Please login first to see protected Quote....</b>
              )} 
        </div>
    )
}

export default Home;
