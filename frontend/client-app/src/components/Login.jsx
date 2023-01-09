import React, {useEffect, useState} from 'react'
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from 'react-toastify';
import AxiosInstance from "../utils/AxiosInstance";

const Login = () => {
    const navigate=useNavigate()
    const [searchparams] = useSearchParams()
    const [logindata, setLogindata]=useState({
        email:"",
        password:""
    })


    const handleOnchange=(e)=>{
        setLogindata({...logindata, [e.target.name]:e.target.value})
    }
    const handleLoginWithGoogle = (response)=>{
        console.log("id_token", response.credential)
    }

    const handleLoginWithGithub =()=>{
        window.location.assign(`https://github.com/login/oauth/authorize/?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`)
    }

    const  send_github__code_to_server = async()=>{
            if (searchparams) {
                try {
                const urlparam = searchparams.get('code')  
                const resp = await AxiosInstance.post('auth/github/', {'code':urlparam})
                const result = resp.data
                console.log('server res: ',result)
                if (resp.status===200) {
                    const user ={
                    'email':result.email,
                    'names':result.full_name
                }
                localStorage.setItem('token', JSON.stringify(result.access_token))
                localStorage.setItem('refresh_token', JSON.stringify(result.refresh_token))
                localStorage.setItem('user', JSON.stringify(user))
                navigate('/dashboard')
                toast.success('login successful')
                }
              } catch (error) {
                if (error.response) {
                    
                    console.log(error.response.data);
                    toast.error(error.response.data.detail)
                  } 
                }  
              }
        
    } 
    let code =searchparams.get('code')
    useEffect(() => {
        if (code) {
           send_github__code_to_server()  
        }   
    }, [code])
    


    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
          client_id:process.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: handleLoginWithGoogle
        });
        google.accounts.id.renderButton(
          document.getElementById("signInDiv"),
          {theme:"outline", size:"large", text:"continue_with", shape:"circle", width:"280"}
        );
          
      }, [])


    const handleSubmit = async(e)=>{
            e.preventDefault()
            if (logindata) {
                 const res = await AxiosInstance.post('auth/login/', logindata)
                 const response= res.data
                 const user={
                    'full_name':response.full_name,
                    'email':response.email
                 }
                   

                 if (res.status === 200) {
                     localStorage.setItem('token', JSON.stringify(response.access_token))
                     localStorage.setItem('refresh_token', JSON.stringify(response.refresh_token))
                     localStorage.setItem('user', JSON.stringify(user))
                      await navigate('/dashboard')
                     toast.success('login successful')
                 }else{
                    toast.error('something went wrong')
                 }
            }
           
    }

  return (
    <div>

<div className='form-container'>
            <div style={{width:"100%"}} className='wrapper'>
            <h2>Login into your account</h2>
            <form action="" onSubmit={handleSubmit}>
                <div className='form-group'>
                 <label htmlFor="">Email Address:</label>
                 <input type="text"
                  className='email-form'
                   value={logindata.email}  
                   name="email"
                   onChange={handleOnchange}/>
                   
               </div>
               
               <div className='form-group'>
                 <label htmlFor="">Password:</label>
                 <input type="text" 
                 className='email-form' 
                 value={logindata.password}
                  name="password"
                 onChange={handleOnchange}/>
               </div>
               
               <input type="submit" value="Login" className="submitButton" />
                        <p className='pass-link'><Link to={'/forget-password'}>forgot password</Link></p>
                </form>
                 <h3 className='text-option'>Or</h3>
            <div className='githubContainer'>
                <button onClick={handleLoginWithGithub}>Sign in with Github</button>
            </div>
            <div className='googleContainer'>
                <div id="signInDiv" className='gsignIn'></div>
            </div>
           </div>
        </div>

    </div>
  )
}

export default Login