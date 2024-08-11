import React, { useState, useEffect } from "react";
import './App.css';
import MyNavbar from "./components/MyNavbar";
import Footer from './components/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Women from './components/Women';
import Man from './components/Man';
import Kids from './components/Kids';
import Beauty from './components/Beauty';
import Cart from './components/Cart';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

function App() {
  const [signInVisible, setSignInVisible] = useState(false);
  const [signUpVisible, setSignUpVisible] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('name');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const toggleSignIn = () => {
    setSignInVisible(true);
    setSignUpVisible(false);
  };

  const toggleSignUp = () => {
    setSignUpVisible(true);
    setSignInVisible(false);
  };

  const handleSignInSuccess = (userName) => {
    setUser(userName);
    setSignInVisible(false);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <MyNavbar setSignInVisible={setSignInVisible} setSignUpVisible={setSignUpVisible} user={user} setUser={setUser} />
        {signInVisible ? (
          <SignIn
            toggleSignUp={toggleSignUp}
            toggleSignIn={toggleSignIn}
            onSignInSuccess={handleSignInSuccess}
          />
        ) : signUpVisible ? (
          <SignUp toggleSignIn={toggleSignIn} />
        ) : (
          <Routes>
            <Route path="/" element={<Beauty />} />
            <Route path="/women" element={<Women />} />
            <Route path="/man" element={<Man />} />
            <Route path="/kids" element={<Kids />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        )}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
