import React from 'react';
import logo from './logo.svg';
import './App.css';

import Amplify from 'aws-amplify'
import config from './aws-exports'
import { Auth } from 'aws-amplify'
import FbLogin from './fblogin'
import AppleLogin from './appleLogin'
Amplify.configure(config)


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={() => Auth.federatedSignIn()}>Login with Facebook</button>
        <FbLogin>FbLogin</FbLogin>
        <AppleLogin>Apple Login</AppleLogin>
      </header>
    </div>
  );
}

export default App;
