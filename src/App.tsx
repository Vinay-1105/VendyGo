import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { TradeSection } from './components/TradeSection';
import { CoOpSection } from './components/CoOpSection';
import { VendorDashboard } from './components/VendorDashboard';
import { VendorRegistration } from './components/VendorRegistration';
import { WholesalerRegistration } from './components/WholesalerRegistration';
import { WholesalerDashboard } from './components/WholesalerDashboard';
import { HowItWorksPage } from './components/HowItWorksPage';
import { ServicesPage } from './components/ServicesPage';

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  location: string;
  rating: number;
  avatar?: string;
  joinedDate: string;
  totalTrades: number;
  coops: string[];
  specialties?: string[];
  role: 'vendor' | 'wholesaler';
};

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState<User | null>(null);
  const [showVendorRegistration, setShowVendorRegistration] = useState(false);
  const [showWholesalerRegistration, setShowWholesalerRegistration] = useState(false);

  // Load user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('vendygo_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
        localStorage.removeItem('vendygo_user');
      }
    }
  }, []);

  // Save user to localStorage whenever user state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('vendygo_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('vendygo_user');
    }
  }, [user]);

  const handleVendorRegistrationComplete = (userData: Omit<User, 'id' | 'rating' | 'avatar' | 'joinedDate' | 'totalTrades' | 'coops' | 'role'>) => {
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      rating: 5.0,
      avatar: `https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop`,
      joinedDate: new Date().toISOString(),
      totalTrades: 0,
      coops: [],
      role: 'vendor'
    };
    setUser(newUser);
    setShowVendorRegistration(false);
    setCurrentPage('dashboard');
  };

  const handleWholesalerRegistrationComplete = (userData: Omit<User, 'id' | 'rating' | 'avatar' | 'joinedDate' | 'totalTrades' | 'coops' | 'role'>) => {
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      rating: 5.0,
      avatar: `https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop`,
      joinedDate: new Date().toISOString(),
      totalTrades: 0,
      coops: [],
      role: 'wholesaler'
    };
    setUser(newUser);
    setShowWholesalerRegistration(false);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const handleLogoClick = () => {
    setCurrentPage('home');
  };

  const handleVendorRegistrationFromCTA = () => {
    setShowVendorRegistration(true);
  };

  const renderCurrentPage = () => {
    if (showVendorRegistration) {
      return (
        <VendorRegistration
          onComplete={handleVendorRegistrationComplete}
          onCancel={() => setShowVendorRegistration(false)}
        />
      );
    }

    if (showWholesalerRegistration) {
      return (
        <WholesalerRegistration
          onComplete={handleWholesalerRegistrationComplete}
          onCancel={() => setShowWholesalerRegistration(false)}
        />
      );
    }

    switch (currentPage) {
      case 'dashboard':
        if (!user) {
          setCurrentPage('home');
          return <Hero onVendorRegister={() => setShowVendorRegistration(true)} onWholesalerRegister={() => setShowWholesalerRegistration(true)} />;
        }
        return user.role === 'vendor' ? <VendorDashboard user={user} /> : <WholesalerDashboard user={user} />;
      case 'trade':
        if (!user || user.role !== 'vendor') {
          setCurrentPage('home');
          return <Hero onVendorRegister={() => setShowVendorRegistration(true)} onWholesalerRegister={() => setShowWholesalerRegistration(true)} />;
        }
        return <TradeSection user={user} />;
      case 'coop':
        if (!user || user.role !== 'vendor') {
          setCurrentPage('home');
          return <Hero onVendorRegister={() => setShowVendorRegistration(true)} onWholesalerRegister={() => setShowWholesalerRegistration(true)} />;
        }
        return <CoOpSection user={user} />;
      case 'services':
        return <ServicesPage />;
      case 'how-it-works':
        return <HowItWorksPage onVendorRegister={handleVendorRegistrationFromCTA} />;
      default:
        return <Hero onVendorRegister={() => setShowVendorRegistration(true)} onWholesalerRegister={() => setShowWholesalerRegistration(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-pink-50">
      <Navigation 
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        user={user}
        onVendorLogin={() => setShowVendorRegistration(true)}
        onWholesalerLogin={() => setShowWholesalerRegistration(true)}
        onLogout={handleLogout}
        onLogoClick={handleLogoClick}
      />
      
      <main className="pt-20">
        {renderCurrentPage()}
      </main>
    </div>
  );
}

export default App;