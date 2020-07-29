import React, {useState} from 'react'
import { updateToken } from '../store'
import { Redirect } from 'react-router-dom';

const Logout = () => {

    const [toHome, setToHome] = useState(false)

    const handleLogout = (e) =>{
        e.preventDefault();
        updateToken(null);
        setToHome(true)
    }

    return (
        <div>
            {toHome ? <Redirect to="/" /> : null}
            <button onClick={handleLogout}>LOGOUT</button>
        </div>
    )
}

export default Logout;