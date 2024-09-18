import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './pages/register';
import Login from './pages/login';
import Mainscreen from './pages/mainscreen';
import Center from './pages/center';


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
          <Route path="/center/:id" element={
            <Center />
          }/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;