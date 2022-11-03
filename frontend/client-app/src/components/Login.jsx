import React, {useEffect} from 'react'

const Login = () => {
    const handleLoginWithGoogle = (response)=>{
        console.log("id_token", response.credential)
    }
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
  return (
    <div>

<div className='form-container'>
            <div style={{width:"100%"}} className='wrapper'>
            <h2>Login into your account</h2>
            <form action="">
                <div className='form-group'>
                 <label htmlFor="">Email Address:</label>
                 <input type="text" className='email-form'  name=""/>
               </div>
               
               <div className='form-group'>
                 <label htmlFor="">Password:</label>
                 <input type="text" className='email-form'  name=""/>
               </div>
               
               <input type="submit" value="Login" className="submitButton" />

                </form>
                 <h3 className='text-option'>Or</h3>
            <div className='githubContainer'>
                <button>Sign in with Github</button>
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