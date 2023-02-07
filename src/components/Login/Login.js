import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';


const loginUser = async(credentials) => {
    const res = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({credentials})
    })
    let data = await res.json();
    return data;
   }

   const signupUser = async(credentials) => {
    const res = await fetch('http://localhost:3001/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({credentials})
    })
    let data = await res.json();
    return data;
   }

const Login = ({ setToken }) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [signupPassword, setSignupPassword] = useState();
    const [signupEmail, setSignupEmail] = useState();
    const [signupName, setSignupName] = useState();
    const [signupError, setSignupError] = useState();
      let [authMode, setAuthMode] = useState("signin")

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
          email,
          password
        });
        if(token !== true){
          return;
        }
        setToken(email);
      }

      const handleSignupSubmit = async e => {
        e.preventDefault();
        const res = await signupUser({
          signupEmail,
          signupName,
          signupPassword
        });
        if(res === true){
          setAuthMode("signin")
          setSignupError(null)
        }
        if(res === 1){
          setSignupError('User alredy exists')
        }
        if(res === false){
          setSignupError('Signup failed')
        }
      }

      if(authMode === "signin"){
        return(
            <div className="Auth-form-container">
              <form className="Auth-form">
                <div className="Auth-form-content">
                  <h3 className="Auth-form-title">Sign In</h3>
                  <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
                  <div className="form-group mt-3">
                    <label>Email address</label>
                    <input
                      type="email"
                      className="form-control mt-1"
                      placeholder="Enter email"
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control mt-1"
                      placeholder="Enter password"
                      onChange={e => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="d-grid gap-2 mt-3">
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                      Submit
                    </button>
                  </div>
                  <p className="forgot-password text-right mt-2">
                    Forgot <a href="#">password?</a>
                  </p>
                </div>
              </form>
            </div>
          )
      }
      return(
        <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3>
            {signupError ?? signupError}
            <div className="text-center">
              Already registered?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign In
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Full Name</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="e.g Jane Doe"
                onChange={e => setSignupName(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Email Address"
                onChange={e => setSignupEmail(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Password"
                onChange={e => setSignupPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary" onClick={handleSignupSubmit}>
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
      )

}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login;