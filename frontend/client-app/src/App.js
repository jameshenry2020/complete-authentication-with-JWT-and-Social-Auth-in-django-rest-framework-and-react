import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from './components/Profile';
import Signup from './components/Signup';
import Login from './components/Login';
import VerifyEmail from './components/VerifyEmail';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PasswordResetRequest from './components/PasswordResetRequest';
import ResetPassword from './components/ResetPassword';

function App() {
  return (
     <div className='App'>
      <Router>
      <ToastContainer />
          <Routes>
            <Route path='/' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/dashboard' element={<Profile/>}/>
            <Route path='/otp/verify' element={<VerifyEmail/>}/>
            <Route path='/forget-password' element={<PasswordResetRequest/>}/>
            <Route path='/password-reset-confirm/:uid/:token' element={<ResetPassword/>}/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
