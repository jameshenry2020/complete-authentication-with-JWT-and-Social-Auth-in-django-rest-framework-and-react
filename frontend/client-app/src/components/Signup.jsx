import React, {useEffect, useState} from 'react'
import axios from "axios"

const Signup = () => {
    const [formdata, setFormdata]=useState({
        email:"",
        first_name:"",
        last_name:"",
        password:"",
        confirm_password:""
    })

    const handleOnchange = (e)=>{
        setFormdata({...formdata, [e.target.name]:e.target.value})
    }
    const handleSigninWithGoogle = async (response)=>{
        const payload=response.credential
        const server_res= await axios.post("http://localhost:8000/api/v1/auth/google/", {'access_token':payload})
        console.log(server_res.data)
    }

    useEffect(() => {
      /* global google */
      google.accounts.id.initialize({
        client_id:process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleSigninWithGoogle
      });
      google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        {theme:"outline", size:"large", text:"continue_with", shape:"circle", width:"280"}
      );
        
    }, [])

    const {email, first_name, last_name, password, confirm_password}=formdata
   
    
  return (
    <div>
        <div className='form-container'>
            <div style={{width:"100%"}} className='wrapper'>
            <h2>create account</h2>
            <form action="">
                <div className='form-group'>
                 <label htmlFor="">Email Address:</label>
                 <input type="text"
                  className='email-form'  
                  name="email" 
                  value={email}  
                  onChange={handleOnchange} />
               </div>
               <div className='form-group'>
                 <label htmlFor="">First Name:</label>
                 <input type="text"
                  className='email-form'
                  name="first_name" 
                  value={first_name} 
                  onChange={handleOnchange}/>
               </div>
               <div className='form-group'>
                 <label htmlFor="">Last Name:</label>
                 <input type="text" 
                 className='email-form'  
                 name="last_name" 
                 value={last_name} 
                 onChange={handleOnchange}/>
               </div>
               <div className='form-group'>
                 <label htmlFor="">Password:</label>
                 <input type="text" 
                 className='email-form'  
                 name="password" 
                 value={password} 
                 onChange={handleOnchange}/>
               </div>
               <div className='form-group'>
                 <label htmlFor="">Confirm Password:</label>
                 <input type="text" 
                 className='p'  
                 name="confirm_password" 
                 value={confirm_password} 
                 onChange={handleOnchange}/>
               </div>
               <input type="submit" value="Submit" className="submitButton" />

                </form>
                 <h3 className='text-option'>Or</h3>
            <div className='githubContainer'>
                <button>Sign up with Github</button>
            </div>
            <div className='googleContainer'>
                <div id="signInDiv" className='gsignIn'></div>
            </div>
           </div>
        </div>

    </div>
  )
}

export default Signup