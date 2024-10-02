import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Updated import for v6
import Login from './Pages/Login/Login';
import Success from './Pages/SuccessPage/Success'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;
