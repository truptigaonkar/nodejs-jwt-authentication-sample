import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Unprotected = () => {
    const [quote, setQuote] = useState('')
    const [error, setError] = useState(false)

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

    return (
        <div style={{borderBottom:'1px solid black'}}>
            <h3>Unprotected Quote</h3>
            <div style={{color:'red'}}>{error && <div>HOME: <b>Unauthorized User</b> - {error}</div>}</div>
            <p>{quote}</p>
        </div>
    )
}

export default Unprotected;
