import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './stylesheets/form-elements.css';
import './stylesheets/text-elements.css';
import './stylesheets/custome-components.css';
import './stylesheets/theme.css';
import './stylesheets/alignments.css';
import './stylesheets/layout.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ProtectedRoute from "./components/ProtectedRoute"
import PublicRoute from './components/PublicRoute';
import Loader from './components/Loader';
import { useSelector } from 'react-redux';
import Transactions from './pages/Transactions';
import Requests from './pages/Requests';
import Profile from './pages/Profile';
import Users from './pages/Users';




function App() {
  const {loading} = useSelector((state) => state.loaders)
  return (
    <div>
    {loading && <Loader />}
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>}></Route>
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>}></Route>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
        <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>}></Route>
        <Route path="/request" element={<ProtectedRoute><Requests /></ProtectedRoute>}></Route>
        <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>}></Route>
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
