import React from 'react';
import { Package, Users, TrendingUp, Shield, MessageSquare, Calculator, Globe, Zap, CheckCircle, ArrowRight } from 'lucide-react';

export function ServicesPage() {
  const vendorServices = [
    {
      icon: MessageSquare,
      title: 'Trading Hub',
      description: 'Trade surplus inventory with other vendors in your network',
      features: [
        'List surplus materials with photos and details',
        'Browse available ingredients from nearby vendors',
        'Secure messaging system with trade templates',
        'Reciprocal trading requirements for fair exchange'
      ],
      gradient: 'from-purple-500 to-blue-500'
    },
    {
      icon: TrendingUp,
      title: 'Bulk & Co-op Buying',
      description: 'Join forces with other vendors to unlock wholesale prices',
      features: [
        'Access exclusive bulk deals from wholesalers',
        'Form co-ops with multiple vendors',
        'Split large quantities proportionally',
        'Real-time co-op status and participant tracking'
      ],
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Calculator,
      title: 'Purchase Calculator',
      description: 'Calculate optimal purchase quantities and savings',
      features: [
        'Dynamic cost calculation tools',
        'Savings comparison across suppliers',
        'Bulk discount optimization',
        'ROI analysis for bulk purchases'
      ],
      gradient: 'from-cyan-500 to-teal-500'
    },
    {
      icon: Shield,
      title: 'Secure Transactions',
      description: 'Every trade protected with advanced escrow system',
      features: [
        'Blockchain-level security',
        'Automated dispute resolution',
        'Quality assurance protocols',
        'Money-back guarantee'
      ],
      gradient: 'from-teal-500 to-green-500'
    }
  ];

  const wholesalerServices = [
    {
      icon: Package,
      title: 'Bulk Order Management',
      description: 'Manage large-scale orders from multiple vendors',
      features: [
        'View and manage vendor bulk requests',
        'Accept or negotiate order terms',
        'Track order fulfillment status',
        'Automated invoicing and payments'
      ],
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: Users,
      title: 'Vendor Network',
      description: 'Connect with verified vendors across the country',
      features: [
        'Access to 15,000+ active vendors',
        'Vendor verification and rating system',
        'Geographic targeting capabilities',
        'Relationship management tools'
      ],
      gradient: 'from-red-500 to-pink-500'
    },
    {
      icon: Globe,
      title: 'Market Analytics',
      description: 'Advanced insights into market trends and demand',
      features: [
        'Real-time demand analytics',
        'Price trend analysis',
        'Regional market insights',
        'Competitive intelligence'
      ],
      gradient: 'from-pink-500 to-purple-500'
    },
    {
      icon: Zap,
      title: 'Instant Notifications',
      description: 'Stay updated with real-time order alerts',
      features: [
        'Instant order notifications',
        'Price alert systems',
        'Inventory level monitoring',
        'Custom notification preferences'
      ],
      gradient: 'from-purple-500 to-indigo-500'
    }
  ];

  const pricingPlans = [
    {
      name: 'Vendor Starter',
      price: '₹999',
      period: '/month',
      description: 'Perfect for small vendors getting started',
      features: [
        'Up to 50 trade listings per month',
        'Basic messaging system',
        'Access to bulk deals',
        'Standard support'
      ],
      popular: false,
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Vendor Pro',
      price: '₹2,499',
      period: '/month',
      description: 'Ideal for active trading vendors',
      features: [
        'Unlimited trade listings',
        'Advanced messaging with templates',
        'Priority access to bulk deals',
        'Co-op creation privileges',
        'Analytics dashboard',
        'Priority support'
      ],
      popular: true,
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      name: 'Wholesaler',
      price: '₹4,999',
      period: '/month',
      description: 'Comprehensive solution for wholesalers',
      features: [
        'Unlimited bulk order management',
        'Advanced vendor analytics',
        'Custom pricing tools',
        'Multi-location support',
        'Dedicated account manager',
        '24/7 premium support'
      ],
      popular: false,
      gradient: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Comprehensive Services for
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Every Business Need
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
              Whether you're a vendor looking to trade and buy in bulk, or a wholesaler managing large orders, 
              we have the perfect solution for your business.
            </p>
          </div>
        </div>
      </section>

      {/* Vendor Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Services for Vendors
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools and features designed to help vendors optimize their operations and maximize profits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {vendorServices.map((service, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl border border-gray-200 hover:border-purple-200 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-700 transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wholesaler Services */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Services for Wholesalers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced tools and analytics to help wholesalers manage large-scale operations and grow their business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {wholesalerServices.map((service, index) => (
              <div
                key={index}
                className="group bg-white p-8 rounded-3xl border border-gray-200 hover:border-orange-200 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-700 transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}