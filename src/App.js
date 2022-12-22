import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Posts from "./components/Posts"
import Home from "./components/Home"

// name, dob, email, phone number

function App() {

  return (
    <div className="container">
      
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/submit' element={<Posts/>} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
