import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import MyPage from './components/MyPage';
import "./style/App.css"

function App() {
  return (
      <div className="app">
      <Header/>
      <Router>
        <Routes>
          <Route path="/" element={<NavBar/>}>
            <Route index element={<Home/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/signin" element={<SignIn/>}/>
          </Route>
          <Route path=":username/mypage" element={<MyPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
