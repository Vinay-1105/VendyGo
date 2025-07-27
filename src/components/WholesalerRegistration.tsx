import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, User, Building, MapPin, Phone, Mail, Check, Package } from 'lucide-react';

interface WholesalerRegistrationProps {
  onComplete: (userData: {
    name: string;
    email: string;
    phone: string;
    businessName: string;
    location: string;
    specialties?: string[];
  }) => void;
  onCancel: () => void;
}

interface FormData {
  // Step 1: Personal Info
  name: string;
  email: string;
  phone: string;
  
  // Step 2: Business Info
  businessName: string;
  businessType: string;
  location: string;
  website: string;
  
  // Step 3: Verification & Preferences
  businessLicense: string;
  taxId: string;
  specialties: string[];
  deliveryRadius: string;
  operatingHours: string;
  
  // Step 4: Agreement
  termsAccepted: boolean;
  marketingConsent: boolean;
}

export function WholesalerRegistration({ onComplete, onCancel }: WholesalerRegistrationProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    businessType: 'distributor',
    location: '',
    website: '',
    businessLicense: '',
    taxId: '',
    specialties: [],
    deliveryRadius: '50',
    operatingHours: '9-17',
    termsAccepted: false,
    marketingConsent: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const businessTypes = [
    'Distributor',
    'Manufacturer',
    'Importer',
    'Agricultural Supplier',
    'Food Processor',
    'Packaging Company',
    'Logistics Provider',
    'Other'
  ];

  const specialtyOptions = [
    'Vegetables',
    'Fruits',
    'Grains & Rice',
    'Spices & Herbs',
    'Dairy Products',
    'Meat & Poultry',
    'Seafood',
    'Baked Goods',
    'Beverages',
    'Cooking Oils',
    'Organic Products',
    'Frozen Foods'
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
        break;
      
      case 2:
        if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
        if (!formData.location.trim()) newErrors.location = 'Location is required';
        break;
      
      case 3:
        if (formData.specialties.length === 0) newErrors.specialties = 'Select at least one specialty';
        break;
      
      case 4:
        if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the terms and conditions';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(4)) {
      onComplete({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        businessName: formData.businessName,
        location: formData.location,
        specialties: formData.specialties
      });
    }
  };

  const toggleSpecialty = (specialty: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty]
    }));
  };

  const steps = [
    { id: 1, title: 'Personal Info', icon: User },
    { id: 2, title: 'Business Details', icon: Building },
    { id: 3, title: 'Preferences', icon: MapPin },
    { id: 4, title: 'Confirmation', icon: Check }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Join as Wholesaler
          </h1>
          <p className="text-xl text-gray-600">
            Complete your registration to start supplying to thousands of vendors
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                  currentStep >= step.id
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-white border-gray-300 text-gray-400'
                }`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <div className="ml-3 hidden sm:block">
                  <div className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'
                  }`}>
                    Step {step.id}
                  </div>
                  <div className={`text-xs ${
                    currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`hidden sm:block w-16 h-0.5 ml-6 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="p-8">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
                  <p className="text-gray-600">Let's start with your basic details</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.name ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.email ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.phone ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="+91 98765 43210"
                  />
                  {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>
            )}

            {/* Step 2: Business Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Business Information</h2>
                  <p className="text-gray-600">Tell us about your wholesale business</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.businessName ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Your wholesale business name"
                  />
                  {errors.businessName && <p className="text-red-600 text-sm mt-1">{errors.businessName}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Type
                    </label>
                    <select
                      value={formData.businessType}
                      onChange={(e) => setFormData(prev => ({ ...prev, businessType: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      {businessTypes.map(type => (
                        <option key={type} value={type.toLowerCase()}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website (Optional)
                    </label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="https://your-website.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Location *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.location ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="City, State/Province, Country"
                  />
                  {errors.location && <p className="text-red-600 text-sm mt-1">{errors.location}</p>}
                </div>
              </div>
            )}

            {/* Step 3: Preferences */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Business Preferences</h2>
                  <p className="text-gray-600">Help us match you with the right vendors</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Product Categories * (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {specialtyOptions.map(specialty => (
                      <button
                        key={specialty}
                        type="button"
                        onClick={() => toggleSpecialty(specialty)}
                        className={`p-3 text-sm rounded-lg border-2 transition-all duration-200 ${
                          formData.specialties.includes(specialty)
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {specialty}
                      </button>
                    ))}
                  </div>
                  {errors.specialties && <p className="text-red-600 text-sm mt-2">{errors.specialties}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Radius (km)
                    </label>
                    <select
                      value={formData.deliveryRadius}
                      onChange={(e) => setFormData(prev => ({ ...prev, deliveryRadius: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="20">Within 20km</option>
                      <option value="50">Within 50km</option>
                      <option value="100">Within 100km</option>
                      <option value="200">Within 200km</option>
                      <option value="500">Within 500km</option>
                      <option value="nationwide">Nationwide</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Operating Hours
                    </label>
                    <select
                      value={formData.operatingHours}
                      onChange={(e) => setFormData(prev => ({ ...prev, operatingHours: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="6-14">6 AM - 2 PM</option>
                      <option value="9-17">9 AM - 5 PM</option>
                      <option value="12-20">12 PM - 8 PM</option>
                      <option value="18-2">6 PM - 2 AM</option>
                      <option value="24/7">24/7</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business License (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.businessLicense}
                      onChange={(e) => setFormData(prev => ({ ...prev, businessLicense: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="License number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tax ID (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.taxId}
                      onChange={(e) => setFormData(prev => ({ ...prev, taxId: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Tax identification number"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Almost Done!</h2>
                  <p className="text-gray-600">Review your information and complete registration</p>
                </div>

                {/* Registration Summary */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-4">Registration Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Name:</span>
                      <span className="ml-2 text-gray-600">{formData.name}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Email:</span>
                      <span className="ml-2 text-gray-600">{formData.email}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Business:</span>
                      <span className="ml-2 text-gray-600">{formData.businessName}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Location:</span>
                      <span className="ml-2 text-gray-600">{formData.location}</span>
                    </div>
                    <div className="md:col-span-2">
                      <span className="font-medium text-gray-700">Categories:</span>
                      <span className="ml-2 text-gray-600">{formData.specialties.join(', ')}</span>
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={formData.termsAccepted}
                      onChange={(e) => setFormData(prev => ({ ...prev, termsAccepted: e.target.checked }))}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-700">
                      I agree to the{' '}
                      <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                        Privacy Policy
                      </a>
                      *
                    </label>
                  </div>
                  {errors.termsAccepted && <p className="text-red-600 text-sm">{errors.termsAccepted}</p>}

                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="marketing"
                      checked={formData.marketingConsent}
                      onChange={(e) => setFormData(prev => ({ ...prev, marketingConsent: e.target.checked }))}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="marketing" className="text-sm text-gray-700">
                      I would like to receive updates about new vendor connections and business opportunities
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="bg-gray-50 px-8 py-6 flex justify-between items-center">
            <button
              onClick={onCancel}
              className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
            >
              Cancel
            </button>

            <div className="flex space-x-4">
              {currentStep > 1 && (
                <button
                  onClick={handlePrevious}
                  className="flex items-center space-x-2 px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-300 transition-all duration-200"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              )}

              {currentStep < 4 ? (
                <button
                  onClick={handleNext}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Complete Registration</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}