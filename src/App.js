import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Shop from './Pages/Shop';
import MainCategoriesPage from './Pages/MainCategoriesPage';
import Footer from './Components/Footer/Footer';
import ProductPage from './Pages/ProductPage';
import SearchPage from './Pages/SearchPage';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import ContactInfo from './Pages/ContactInfo';
import ShippingPolicy from './Pages/ShippingPolicy';
import TermsOfService from './Pages/TermsOfService';
import RefundPolicy from './Pages/RefundPolicy';
import Profile from './Pages/Profile';
import Checkout from './Pages/Checkout';
import Ordersuccess from './Pages/Ordersuccess';

// ✅ IMPORT CONTEXT
import { UserProvider } from './Context/UserContext';

function App() {
  return (
    // ✅ WRAP EVERYTHING WITH UserProvider
    <UserProvider>
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Shop />} />
            <Route path='/categories' element={<MainCategoriesPage />} />
            <Route path='/allproducts' element={<Product />} />
            <Route path='/product/:id' element={<ProductPage />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/login' element={<LoginSignup />} />
            <Route path='/search' element={<SearchPage />} />
            <Route path='/privacy-policy' element={<PrivacyPolicy />} />
            <Route path='/contact-information' element={<ContactInfo />} />
            <Route path='/shipping-policy' element={<ShippingPolicy />} />
            <Route path='/terms-of-service' element={<TermsOfService />} />
            <Route path='/refund-policy' element={<RefundPolicy />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/thank-you' element={<Ordersuccess />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </UserProvider>
  );
}

export default App;
