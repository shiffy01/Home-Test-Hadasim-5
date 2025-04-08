import SupplierPage from './SupplierPage';
import SupermarketPage from './Supermarket';
import SignUpPage from './Signup';
import SignInPage from './Signin';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/supplier" element={<SupplierPage />} />
        <Route path="/store" element={<SupermarketPage />} />
      </Routes>
    </Router>
  );
    
     
}

export default App;
