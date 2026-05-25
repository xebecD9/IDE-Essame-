import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Navbar from './layouts/Navbar';
import TaskDetail from './pages/TaskDetail';
function App() {
return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/task/:id" element={<TaskDetail />} />
        </Routes>
      </div>  
    </BrowserRouter>
)
}
export default App;
