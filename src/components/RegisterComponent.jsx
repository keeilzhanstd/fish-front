import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCustomer } from "./api/ApiService";
import { useAuth } from "./auth/AuthContext";

export default function RegisterComponent() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [checked, setChecked] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)

    const authContext = useAuth()
    const navigate = useNavigate()

    function handleUsernameChange(event) {
        setUsername(event.target.value)
    }

    const handleChange = () => {
        setChecked(!checked);
      };
      
    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    async function handleSubmit() {

        let resp = {}
        resp.username = username;
        resp.password = password;
        resp.role = "ROLE_USER"
        if(checked) {
            resp.role = "ROLE_ADMIN,ROLE_USER"
        }

        console.log(resp)
        createCustomer(resp)
        .then((response) => {setErrorMessage(false); navigate('/login')})
        .catch((error) => setErrorMessage(true))
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
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={handleChange}
                />
                <label>Give user ADMIN role?</label>
                <br></br>
                <button type="button" className="btn btn-success" name="loginbtn" onClick={handleSubmit}>Register</button>
                
            </div>
        </div>
    )
}

