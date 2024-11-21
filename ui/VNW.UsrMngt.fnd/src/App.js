import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MainLayout from './components/main-layout/MainLayout.js';
import FormLogin from './components/form-login/FormLogin.js';
import FormAuthn from './components/form-authenication/FormAuthn.js';
import FormSignUp from './components/form-signup/FormSignUp.js';
import FormContainer from './components/form-container/FormContainer.js';
import CodeVerification from './components/form-code-verify/CodeVerification.js';
import PasswordReset from './components/form-password-reset/PasswordReset.js';
import loginHandle from  './events/verifyOTPForLoginHandleClick.js';
import resetHandle from './events/verifyOTPForResetPasswordHandleClick.js';


function App() {
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
