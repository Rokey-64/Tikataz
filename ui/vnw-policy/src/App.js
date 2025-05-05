// import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import './i18n';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          {/* <Route index element={<FormLogin />}></Route> */}
          {/* <Route path='/login' element={<FormLogin />}></Route>
          <Route path='/signup' element={<FormSignUp />}></Route>
          <Route path='/identity' element={<FormContainer item={<FormAuthn />} title={'Autentication'} />} isNeedsToken={false}></Route>
          <Route path='/pw-reset' element={<FormContainer item={<PasswordReset />} title={'Reset password'} isNeedsToken={true} />}></Route>
          <Route path='/login-otp' element={<FormContainer item={<CodeVerification handleClick={loginHandle} />} title={'Verification'} isNeedsToken={true} />}></Route>
          <Route path='/reset-otp' element={<FormContainer item={<CodeVerification handleClick={resetHandle} />} title={'Verification'} isNeedsToken={true} />}></Route> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
