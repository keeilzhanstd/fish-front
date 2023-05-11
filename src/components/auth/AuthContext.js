import { createContext, useContext, useState } from "react";
import { apiClient } from './../api/ApiClient'
import { executeBasicAuthService, getCustomerByUsername } from "../api/ApiService";

export const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({children}) {
    const [isAuthenticated, setAuthenticated] = useState(false)
    const [token, setToken] = useState(null)
    const [user, setUser] = useState({})

    async function login(username, password) {
        const baToken = 'Basic ' + window.btoa(username+":"+password)
        try {
            const response = await executeBasicAuthService(token, {username, password})
            if(response.status===201){
                //Intercept and append auth token to every apiClient request
                apiClient.interceptors.request.use((config) => {config.headers.Authorization = baToken; return config});
                
                await getCustomerByUsername(username)
                .then( (response) => { setUser(response.data); setAuthenticated(true); 
                    setToken(baToken); } )
                .catch(error => console.log(error))
                return true;
            }
        } catch(error) {logout(); return false; }
        
    }

    function logout() { setAuthenticated(false); setToken(null); setUser({}); apiClient.interceptors.request.clear()}

    return (
        <AuthContext.Provider value = {{isAuthenticated, login, logout, user, token}}>
            {children}
        </AuthContext.Provider>
    )
}

