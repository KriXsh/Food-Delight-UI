import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import AuthProvider from './context/AuthContext';
import CartProvider from './context/CartContext';
import ProfileProvider from './context/ProfileContext';
import ErrorBoundary from './components/ErrorBoundary';
import './styles/index.css';
import './styles/components.css';

const AppRoutes = lazy(() => import('./routes')); // Lazy load the routes

const App = () => {
  return (
    <Router> {/* Router should wrap the entire app */}
      <AuthProvider>
        <CartProvider>
          <ProfileProvider>
            <ErrorBoundary>
              <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <div className="main-content">
                  <AppRoutes /> {/* Using the lazy-loaded routes */}
                </div>
                <Footer />
              </Suspense>
            </ErrorBoundary>
          </ProfileProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
