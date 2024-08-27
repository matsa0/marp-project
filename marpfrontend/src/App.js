import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './pages/register';
import Login from './pages/login';
import Mainscreen from './pages/mainscreen';
import AddCenter from './pages/addCenter';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={
            <Login />
          }/>
          <Route path="/register" element={
            <Register />
          }/>
          <Route path="/homepage" element={
            <Mainscreen />
          }/>
          <Route path="/addCenter" element={
            <AddCenter />
          }/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;