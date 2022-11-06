import axios from "axios"
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";


let accessToken=localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : ""
let refresh_token=localStorage.getItem('refresh_token') ? JSON.parse(localStorage.getItem('refresh_token')) : ""

console.log('access: ',accessToken)
const baseURL= 'http://localhost:8000/api/v1/'

const AxiosInstance = axios.create({
    baseURL:baseURL,
    'Content-type':'application/json',
     headers: {Authorization: localStorage.getItem('token') ? `Bearer ${accessToken}` : ""},
  });

 AxiosInstance.interceptors.request.use(async req =>{
    if (accessToken) {
        //  accessToken=localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null
         req.headers.Authorization = localStorage.getItem('token') ? `Bearer ${accessToken}` : ""
         const user = jwt_decode(accessToken)
        const isExpired=dayjs.unix(user.exp).diff(dayjs()) < 1
        if(!isExpired) return req
        const resp =await axios.post(`${baseURL}auth/token/refresh/`, {
        refresh:refresh_token
        })
         console.log('new_accesstoken: ',resp.data.access)
         localStorage.setItem('token', JSON.stringify(resp.data.access))
         req.headers.Authorization = `Bearer ${resp.data.access}`
         return req
    }else{
       req.headers.Authorization = localStorage.getItem('token') ? `Bearer ${JSON.parse(localStorage.getItem('token'))}` : " "
       return req 
    }
 
    
             
 })

export default AxiosInstance;