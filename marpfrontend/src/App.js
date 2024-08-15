import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';

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
        </Routes>
      </Router>
    </div>
  );
}

export default App;