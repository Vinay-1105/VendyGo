import React from 'react';
import { ArrowRight, Users, TrendingUp, Shield, MapPin, Zap, Globe, Award, Package, Handshake } from 'lucide-react';

interface HeroProps {
  onVendorRegister: () => void;
  onWholesalerRegister: () => void;
}

export function Hero({ onVendorRegister, onWholesalerRegister }: HeroProps) {
  const features = [
    {
      icon: Users,
      title: 'Smart Trading',
      description: 'AI-powered matching connects you with the right vendors instantly',
      gradient: 'from-purple-500 to-blue-500'
    },
    {
      icon: TrendingUp,
      title: 'Co-Op Power',
      description: 'Join cooperatives to unlock wholesale prices and maximize your profits',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Shield,
      title: 'Secure Trading',
      description: 'Every transaction protected with blockchain-level security',
      gradient: 'from-cyan-500 to-teal-500'
    },
    {
      icon: Zap,
      title: 'Real-time Updates',
      description: 'Live market data and instant trade notifications',
      gradient: 'from-teal-500 to-green-500'
    }
  ];

  const stats = [
    { number: '25,000+', label: 'Active Vendors', color: 'text-purple-600' },
    { number: '₹125M+', label: 'Monthly Volume', color: 'text-blue-600' },
    { number: '350+', label: 'Cities Covered', color: 'text-cyan-600' },
    { number: '99.2%', label: 'Success Rate', color: 'text-teal-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-200 rounded-full opacity-20 animate-float delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-pink-200 rounded-full opacity-20 animate-float delay-2000"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-orange-300 rounded-full opacity-20 animate-float delay-3000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto">
            <div className="mb-8">
              <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-100 to-purple-100 text-orange-800 text-sm font-semibold rounded-full border border-orange-200 animate-pulse-glow">
                <Award className="w-4 h-4 mr-2" />
                India's #1 Vendor Trading Platform
              </span>
            </div>

            <h1 className="text-responsive-4xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight font-poppins animate-fade-in-up">
              Transform Your Vendor Business{' '}
              <span className="bg-gradient-to-r from-orange-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Today
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-4xl mx-auto animate-fade-in-up delay-200">
              Join India's most advanced vendor ecosystem. Trade surplus inventory, 
              participate in cooperative buying, and connect with thousands of verified vendors across the country.
            </p>
            
            {/* Registration Options */}
            <div className="flex flex-col lg:flex-row justify-center gap-8 mb-16">
              <div className="group relative flex-1 max-w-md">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <button
                  onClick={onVendorRegister}
                  className="relative w-full px-8 py-6 bg-white rounded-2xl shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 animate-slide-in-left"
                >
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:animate-bounce">
                      <Package className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-gray-900">Join as Vendor</h3>
                      <p className="text-sm text-gray-600">Trade & Cooperative Buying</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Perfect for restaurants, retailers, and food businesses who want to trade surplus inventory and access cooperative deals.
                  </p>
                  <div className="flex items-center justify-center text-orange-600 font-semibold">
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </button>
              </div>

              <div className="group relative flex-1 max-w-md">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <button
                  onClick={onWholesalerRegister}
                  className="relative w-full px-8 py-6 bg-white rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 animate-slide-in-right"
                >
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:animate-bounce">
                      <Handshake className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-gray-900">Join as Wholesaler</h3>
                      <p className="text-sm text-gray-600">Bulk Supply & Distribution</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Perfect for suppliers and distributors who want to sell bulk quantities to multiple vendors and manage large-scale orders.
                  </p>
                  <div className="flex items-center justify-center text-blue-600 font-semibold">
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </button>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group animate-fade-in-up" style={{animationDelay: `${index * 100}ms`}}>
                  <div className={`text-3xl md:text-5xl font-bold ${stat.color} mb-2 group-hover:scale-110 transition-transform duration-300`}>
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-responsive-3xl md:text-5xl font-bold text-gray-900 mb-6 font-poppins animate-fade-in-up">
              Why Choose VendyGo?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of vendor commerce with cutting-edge technology and unmatched reliability.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 bg-gradient-to-br from-white to-gray-50 rounded-3xl border border-gray-100 hover:border-orange-200 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 animate-fade-in-up"
                style={{animationDelay: `${index * 150}ms`}}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-orange-700 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {feature.description}
                </p>
                
                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-900 via-purple-900 to-pink-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-responsive-3xl md:text-5xl font-bold text-white mb-6 font-poppins animate-fade-in-up">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful vendors who have revolutionized their business experience with VendyGo
          </p>
          <div className="flex justify-center">
            <button
              onClick={onVendorRegister}
              className="group px-8 py-4 bg-white text-orange-700 font-semibold rounded-2xl hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-white/25 transform hover:-translate-y-2 hover:scale-105 flex items-center justify-center space-x-3"
            >
              <span>Start as Vendor</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}