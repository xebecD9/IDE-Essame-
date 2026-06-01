import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard'; 
import TaskDetail from './pages/TaskDetail'; 
import Navbar from './layouts/Navbar';
function App() {
  return (
    <BrowserRouter>
      {}
      <Navbar />
      {}
      <Routes>
        {}
        <Route path="/" element={<Dashboard />} />
        {}
        {}
        <Route path="/task/:id" element={<TaskDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
