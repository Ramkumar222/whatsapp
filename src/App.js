import './App.css';
import Chat from './components/chat';
import Login from './components/login';
import Register from './components/register';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<Chat/>} />
        {/* Add more routes as needed */}
      </Routes>
      </BrowserRouter>
     </div>
  );
}

export default App;
