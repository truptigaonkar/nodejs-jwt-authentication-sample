import React, {useState} from 'react'
import { token$, updateToken } from '../store'
import { Redirect } from 'react-router-dom';

const Home = () => {
    const [toLogin, setToLogin] = useState(false)

    function handleLogout(e) {
        e.preventDefault();
        updateToken(null);
        window.localStorage.clear();
        setToLogin(true)
      }
    return (
        <div>
            <h4>Home</h4>
            {toLogin ? <Redirect to="/" /> : null}
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Home;
