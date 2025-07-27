import React, { useState } from 'react';
import { Menu, X, User, MessageSquare, TrendingUp, Home, Info, Phone, HelpCircle, Settings, Briefcase, Calculator, Package } from 'lucide-react';
import type { User as UserType } from '../App';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  user: UserType | null;
  onVendorLogin: () => void;
  onWholesalerLogin: () => void;
  onLogout: () => void;
  onLogoClick: () => void;
}

export function Navigation({ currentPage, onNavigate, user, onVendorLogin, onWholesalerLogin, onLogout, onLogoClick }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginOptions, setShowLoginOptions] = useState(false);

  // Define navigation items based on user status
  const getNavItems = () => {
    const baseItems = [
      { id: 'home', label: 'Home', icon: Home },
    ];

    if (user) {
      if (user.role === 'vendor') {
        // Only show Trade and Co-Op for logged-in vendors
        return [
          ...baseItems.slice(0, 1), // Home
          { id: 'trade', label: 'Trade', icon: MessageSquare },
          { id: 'coop', label: 'Co-Op', icon: TrendingUp },
          { id: 'services', label: 'Services', icon: Briefcase },
          { id: 'how-it-works', label: 'How It Works', icon: HelpCircle },
        ];
      } else {
        // Wholesaler navigation
        return [
          ...baseItems.slice(0, 1), // Home
          { id: 'services', label: 'Services', icon: Briefcase },
          { id: 'how-it-works', label: 'How It Works', icon: HelpCircle },
        ];
      }
    }

    return [
      ...baseItems,
      { id: 'services', label: 'Services', icon: Briefcase },
      { id: 'how-it-works', label: 'How It Works', icon: HelpCircle },
    ];
  };

  const navItems = getNavItems();

  return (
    <>
      {/* Main Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <button 
                onClick={onLogoClick}
                className="flex items-center space-x-3 group transition-all duration-300 hover:scale-105"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 animate-pulse-glow">
                  <div className="flex items-center justify-center">
                    <span className="text-4xl font-black text-white drop-shadow-lg" style={{ fontFamily: 'Georgia, serif' }}>V</span>
                    <span className="text-2xl font-bold text-yellow-300 drop-shadow-md ml-0.5" style={{ fontFamily: 'Arial, sans-serif' }}>G</span>
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 via-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-pink-600 group-hover:to-orange-600 transition-all duration-500 animate-fade-in-up">
                  VendyGo
                  </h1>
                  <p className="text-xs text-gray-500 font-medium animate-slide-in-right">Vendor Trading Platform</p>
                </div>
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group ${
                    currentPage === item.id
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-700 hover:transform hover:scale-105'
                  }`}
                >
                  <item.icon className={`w-4 h-4 transition-transform duration-300 ${
                    currentPage === item.id ? 'text-white' : 'text-gray-500 group-hover:text-purple-600'
                  }`} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* User Section */}
            <div className="hidden lg:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-3 p-2 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center ring-2 ring-purple-200">
                      <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-gray-900 truncate">{user.name}</div>
                      <div className="text-xs text-purple-600 font-medium capitalize">{user.role}</div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => onNavigate('dashboard')}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2 text-sm font-medium"
                  >
                    <User className="w-4 h-4" />
                    <span>Dashboard</span>
                  </button>
                  
                  <button
                    onClick={onLogout}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setShowLoginOptions(!showLoginOptions)}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-medium"
                  >
                    Join Platform
                  </button>
                  
                  {showLoginOptions && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50">
                      <button
                        onClick={() => {
                          onVendorLogin();
                          setShowLoginOptions(false);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-3"
                      >
                        <Package className="w-4 h-4 text-orange-600" />
                        <span className="text-gray-900">Join as Vendor</span>
                      </button>
                      <button
                        onClick={() => {
                          onWholesalerLogin();
                          setShowLoginOptions(false);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-3"
                      >
                        <Package className="w-4 h-4 text-blue-600" />
                        <span className="text-gray-900">Join as Wholesaler</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-xl">
            <div className="px-4 py-6 space-y-3">
              {/* Mobile User Info */}
              {user && (
                <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100 mb-4">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center ring-2 ring-purple-200">
                    <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-900 truncate">{user.name}</div>
                    <div className="text-xs text-purple-600 font-medium capitalize">{user.role}</div>
                  </div>
                </div>
              )}

              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                    currentPage === item.id
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
              
              {user ? (
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <button
                    onClick={() => {
                      onNavigate('dashboard');
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium shadow-lg"
                  >
                    <User className="w-5 h-5" />
                    <span>Dashboard</span>
                  </button>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-4 py-3 text-gray-600 hover:text-gray-900 text-left rounded-xl hover:bg-gray-50 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-200">
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        onVendorLogin();
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-4 py-3 bg-gradient-to-r from-orange-600 to-purple-600 text-white rounded-xl font-medium shadow-lg flex items-center space-x-2"
                    >
                      <Package className="w-4 h-4" />
                      <span>Join as Vendor</span>
                    </button>
                    <button
                      onClick={() => {
                        onWholesalerLogin();
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-medium shadow-lg flex items-center space-x-2"
                    >
                      <Package className="w-4 h-4" />
                      <span>Join as Wholesaler</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}