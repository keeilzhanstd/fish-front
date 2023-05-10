import axios from "axios"

//export const apiClient = axios.create( { baseURL: 'http://codefish-env.eba-qjvcc2ua.ap-northeast-1.elasticbeanstalk.com/' } )
export const apiClient = axios.create( { baseURL: 'http://localhost:8080/' } )