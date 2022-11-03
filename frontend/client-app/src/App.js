import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from './components/Profile';
import Signup from './components/Signup';
import Login from './components/Login';
import VerifyEmail from './components/VerifyEmail';

function App() {
  return (
     <div className='App'>
      <Router>
          <Routes>
            <Route  path='/' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/dashboard' element={<Profile/>}/>
            <Route path='/otp/verify' element={<VerifyEmail/>}/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
