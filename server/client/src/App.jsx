// client/src/App.jsx
import { Routes, Route } from 'react-router-dom';
import TermsPage from './components/TermsPage';
import ProductList from './pages/ProductList';

function App() {
  return (
    <Routes>
      <Route path="/" element={<TermsPage />} />
      <Route path="/products" element={<ProductList />} />
    </Routes>
  );
}

export default App;
