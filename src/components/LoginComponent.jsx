import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";

export default function LoginComponent() {

    const [username, setUsername] = useState('admin')
    const [password, setPassword] = useState('admin')
    const [errorMessage, setErrorMessage] = useState(false)
    const authContext = useAuth()
    const navigate = useNavigate()

    function handleUsernameChange(event) {
        setUsername(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    async function handleSubmit() {
        if(await authContext.login(username, password)) {
            setErrorMessage(false);
            navigate(`/home`)
        } else {
            setErrorMessage(true);
        }
    }

    return (
        <div className="container">
            <div className="loginForm">
                <div>
                    <label>Username</label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
                </div>
                <button type="button" className="btn btn-success" name="loginbtn" onClick={handleSubmit}>Login</button>
                <button type="button" className="btn btn-primary" name="regbtn" onClick={() => navigate(`/register`)}>Register</button>
                {errorMessage && <div className="errorMessage">Authentication failed</div>}

            </div>
        </div>
    )
}

