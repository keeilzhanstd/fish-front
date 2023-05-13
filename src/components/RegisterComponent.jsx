import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCustomer } from "./api/ApiService";
import { useAuth } from "./auth/AuthContext";

export default function RegisterComponent() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(false)
    const [errorMessageText, setErrorMessageText] = useState("")

    const authContext = useAuth()
    const navigate = useNavigate()

    function handleUsernameChange(event) {
        setUsername(event.target.value)
    }
      
    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    async function handleSubmit() {
        let resp = {}
        resp.username = username;
        resp.password = password;
        resp.role = "ROLE_USER"
        createCustomer(resp)
        .then((response) => {setErrorMessage(false); navigate('/login')})
        .catch((error) => {setErrorMessage(true); setErrorMessageText(error); console.log(error)})
    }

    return (
        <div className="container">
            <div className="loginForm">
                {errorMessage && <div className="errorMessage alert alert-danger">Username already taken</div>}
                <div>
                    <label>Username</label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
                </div>
                <br></br>
                <button type="button" className="btn btn-success" name="loginbtn" onClick={handleSubmit}>Register</button>
            </div>
        </div>
    )
}

