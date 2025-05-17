import './App.css';
import { useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MainLayout from './components/main-layout/MainLayout';
import FormLogin from './components/form-login/FormLogin';
import FormAuthn from './components/form-authenication/FormAuthn';
import FormSignUp from './components/form-signup/FormSignUp';
import FormContainer from './components/form-container/FormContainer';
import CodeVerification from './components/form-code-verify/CodeVerification';
import PasswordReset from './components/form-password-reset/PasswordReset';
import loginHandle from  './events/verifyOTPForLoginHandleClick';
import resetHandle from './events/verifyOTPForResetPasswordHandleClick';

import loginVerify from './api/auths';
import i18n from './i18n';


function App() {
  /**
   * Check where the user is logged in or not
   * @returns 
   */

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await loginVerify();
        if (res.status === 200) {
          setIsLoggedIn(true);
        }
        else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }
  , []);

  useEffect(() => {
    if (isLoggedIn) {
      
      window.location.href = 'https://tikataz.com/';
    }
  }
  , [isLoggedIn]);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<FormLogin />}></Route>
          <Route path='/login' element={<FormLogin />}></Route>
          <Route path='/signup' element={<FormSignUp />}></Route>
          <Route path='/identity' element={<FormContainer item={<FormAuthn/>} title={'Autentication'}/>} isNeedsToken={false}></Route>
          <Route path='/pw-reset' element={<FormContainer item={<PasswordReset/>} title={'Reset password'} isNeedsToken={true}/>}></Route>
          <Route path='/login-otp' element={<FormContainer item={<CodeVerification handleClick={loginHandle}/>} title={'Verification'} isNeedsToken={true}/>}></Route>
          <Route path='/reset-otp' element={<FormContainer item={<CodeVerification handleClick={resetHandle}/>} title={'Verification'} isNeedsToken={true}/>}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
