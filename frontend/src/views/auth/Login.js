import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useState } from 'react';
import axios from "axios";
import SuccessAlert from "components/Alerts/SuccessAlert";
import ErrorAlert from "components/Alerts/ErrorAlert";
import validator from "validator";
import { baseUrl } from '../../config';

export default function Login() {  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resultNotification, setResultNotification] = useState([]);
  const [error, setError] = useState(false);
  const [submit, setSubmit] = useState(false);
  const history = useHistory();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const delay = (ms) => {
    return new Promise( res => setTimeout(res, ms) );
  }

  const handleLogin = (event) => {
    event.preventDefault();
    setSubmit(true);
    setError(false);
    setResultNotification([]);

    if(!validator.isEmail(email)) {
      setError(true);
      return setResultNotification(['Invalid Email!']);
    }

    if(!password.length) {
      setError(true);
      return setResultNotification(['Invalid Password!']);
    }

    if (email && password) {
      axios.post(baseUrl + '/login', {
        email: email,
        password: password
      }).then(async (response) => {
        setResultNotification(response.data.message);
        localStorage.setItem('userId', response.data.user.id);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.user.role);
        localStorage.setItem('email_verified', response.data.user.email_verified_at ? true : false);
        await delay(500);
        history.push('/dashboard');
      }).catch((err) => {
        setError(true);
        let validation_errors = err?.response?.data?.validation_errors;
        let errors = Object.keys(validation_errors);
        let all_errors = [];
        for (let i = 0; i < errors.length; i++) {
          all_errors.push(validation_errors[errors[i]]);
        }
        setResultNotification(all_errors);
      });
      return;
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            {submit ?
              (!error && resultNotification.length ?
                <SuccessAlert message={resultNotification} />
                :
                resultNotification.map((notification, idx) => <ErrorAlert message={notification} key={idx} />)
              )
              :
              ''}
            <form action="#">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <h6 className="text-blueGray-800 text-md font-bold uppercase">
                      Login
                    </h6>
                  </div>
                  <hr className="mt-6 border-b-1 border-blueGray-300" />
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      onChange={handleEmailChange}
                      required
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                      onClick={handleLogin}
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <Link to="/auth/forgot-password" className="text-blueGray-200">
                  <small>Forgot password?</small>
                </Link>
              </div>
              <div className="w-1/2 text-right">
                <Link to="/auth/register" className="text-blueGray-200">
                  <small>Create new account</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
