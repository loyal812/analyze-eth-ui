import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Analyze from './pages/analyze';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import Forgot from './pages/forgot';
import Loading from './components/Loading';
import { useSelector } from "react-redux";

function App() {
  const { globalState } = useSelector((state) => state);
  const { loading } = globalState;

  return (
    <div className="App">
      {loading && <Loading />}
      <Routes>
        <Route path="/" element={<Navigate to="/analyze" />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analyze" element={<Analyze />} />

        <Route path="/forgot" element={<Forgot />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
