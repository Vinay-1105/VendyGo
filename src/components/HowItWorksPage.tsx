import React, { useState } from 'react';
import { Play, CheckCircle, Users, MessageSquare, DollarSign, Shield, ArrowRight, Star } from 'lucide-react';

interface HowItWorksPageProps {
  onVendorRegister: () => void;
}

export function HowItWorksPage({ onVendorRegister }: HowItWorksPageProps) {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: 'Register & Verify',
      description: 'Sign up as a vendor and complete your business profile',
      icon: Users,
      details: [
        'Complete your vendor registration with business details',
        'Verify your identity and business credentials',
        'Set up your profile with specialties and location',
        'Get approved and start accessing the platform'
      ]
    },
    {
      id: 2,
      title: 'Post or Browse',
      description: 'List surplus ingredients or search for needed items',
      icon: MessageSquare,
      details: [
        'Post surplus ingredients with photos and details',
        'Browse available ingredients in your area',
        'Use smart filters to find exactly what you need',
        'Get AI-powered matching suggestions'
      ]
    },
    {
      id: 3,
      title: 'Connect & Negotiate',
      description: 'Chat with other vendors and negotiate terms',
      icon: DollarSign,
      details: [
        'Use built-in messaging to discuss trades',
        'Share photos and additional details',
        'Negotiate quantities, quality, and timing',
        'Use pre-built message templates for efficiency'
      ]
    },
    {
      id: 4,
      title: 'Secure Transaction',
      description: 'Complete trades with built-in escrow protection',
      icon: Shield,
      details: [
        'Agreements are secured with digital escrow',
        'Both parties confirm receipt and quality',
        'Automated dispute resolution if needed',
        'Rating system builds trust over time'
      ]
    }
  ];

  const features = [
    {
      title: 'Ingredient Swapping',
      description: 'Trade surplus ingredients with nearby vendors to reduce waste and save money.',
      icon: '🔄',
      benefits: ['Reduce food waste by 40%', 'Save up to 30% on ingredient costs', 'Build local vendor relationships']
    },
    {
      title: 'Bulk Group Buying',
      description: 'Join with other vendors to meet minimum orders and unlock wholesale prices.',
      icon: '📦',
      benefits: ['Access wholesale pricing', 'Share shipping costs', 'Meet minimum order requirements']
    },
    {
      title: 'Real-time Chat',
      description: 'Secure messaging system with built-in templates for efficient communication.',
      icon: '💬',
      benefits: ['Instant notifications', 'Photo sharing capabilities', 'Message templates for speed']
    },
    {
      title: 'Escrow Protection',
      description: 'Every transaction is protected until both parties confirm successful exchange.',
      icon: '🛡️',
      benefits: ['100% secure transactions', 'Dispute resolution system', 'Money-back guarantee']
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      business: 'Sharma Family Restaurant',
      quote: 'VendyGo ne hamare food waste ko 50% kam kar diya aur humein ingredients par ₹1,50,000 monthly bachane mein madad ki.',
      rating: 5,
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Rajesh Kumar',
      business: 'Kumar Spice Kitchen',
      quote: 'Bulk buying feature bahut amazing hai. Ab humein restaurant-quality ingredients wholesale prices par mil jaate hain.',
      rating: 5,
      image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Anjali Patel',
      business: 'Patel Gujarati Thali',
      quote: 'Hard-to-find spices ke liye reliable suppliers mil gaye. Is platform ne hamari procurement ko completely transform kar diya hai.',
      rating: 5,
      image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-emerald-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              How VendyGo
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Works for You
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Transform your vendor business in 4 simple steps. Join thousands of vendors who are saving money, reducing waste, and growing their business.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Steps */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple Process, Powerful Results
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Getting started is easy. Follow these four steps to begin optimizing your vendor operations
            </p>
          </div>

          {/* Step Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`flex items-center space-x-3 px-6 py-4 rounded-xl font-medium transition-all duration-300 ${
                  activeStep === step.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <step.icon className="w-5 h-5" />
                <span>Step {step.id}: {step.title}</span>
              </button>
            ))}
          </div>

          {/* Active Step Content */}
          <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
                    {React.createElement(steps[activeStep - 1].icon, { className: "w-8 h-8 text-white" })}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-blue-600 mb-1">Step {activeStep}</div>
                    <h3 className="text-2xl font-bold text-gray-900">{steps[activeStep - 1].title}</h3>
                  </div>
                </div>
                
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {steps[activeStep - 1].description}
                </p>

                <div className="space-y-4">
                  {steps[activeStep - 1].details.map((detail, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-emerald-100 rounded-2xl flex items-center justify-center shadow-2xl">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      {React.createElement(steps[activeStep - 1].icon, { className: "w-10 h-10 text-blue-600" })}
                    </div>
                    <p className="text-gray-600 font-medium">Step {activeStep}</p>
                    <p className="text-sm text-gray-500">{steps[activeStep - 1].title}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Every Vendor
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform provides everything you need to optimize your vendor operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div className="text-4xl">{feature.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories from Our Community
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how vendors like you are transforming their business with VendyGo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-emerald-50 p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.business}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                <blockquote className="text-gray-700 italic leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Get answers to common questions about VendyGo
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: 'How does the escrow system work?',
                answer: 'Our escrow system securely holds payments until both parties confirm successful delivery and quality. This ensures safe transactions for all vendors.'
              },
              {
                question: 'What fees does VendyGo charge?',
                answer: 'We only charge a small transaction fee when successful deals are completed. Registration and browsing are completely free.'
              },
              {
                question: 'How do I verify other vendors?',
                answer: 'All vendors go through identity verification. You can also view ratings, reviews, and transaction history before engaging in trades.'
              },
              {
                question: 'Can I join bulk deals with specific requirements?',
                answer: 'Yes! You can specify your exact quantity needs and quality requirements when joining bulk purchasing groups.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of vendors who are already saving money and reducing waste
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onVendorRegister}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <span>Start Free Registration</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}