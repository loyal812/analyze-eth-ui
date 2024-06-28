import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import Forgot from './pages/forgot';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/forgot" element={<Forgot />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
