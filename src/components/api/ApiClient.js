import axios from "axios"

//export const apiClient = axios.create( { baseURL: 'http://codefish-env.eba-qjvcc2ua.ap-northeast-1.elasticbeanstalk.com/' } )
export const apiClient = axios.create( { baseURL: process.env.REACT_APP_API_URL } )