import React, { useState } from 'react';
import { Package, Users, TrendingUp, Star, MapPin, Calendar, DollarSign, Eye, Plus, Check, X, Clock, AlertCircle } from 'lucide-react';
import type { User as UserType } from '../App';

interface WholesalerDashboardProps {
  user: UserType;
}

interface Product {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  minimumOrder: number;
  description: string;
  image: string;
  status: 'active' | 'inactive';
  createdAt: string;
  totalInterest: number;
  individualInterest: number;
  coopInterest: number;
}

interface VendorInterest {
  id: string;
  productId: string;
  vendorName: string;
  vendorLocation: string;
  vendorRating: number;
  requestedQuantity: number;
  type: 'individual' | 'coop';
  coopMembers?: string[];
  message: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export function WholesalerDashboard({ user }: WholesalerDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreateProduct, setShowCreateProduct] = useState(false);

  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Premium Basmati Rice',
      category: 'Grains',
      quantity: 5000,
      unit: 'kg',
      pricePerUnit: 85,
      minimumOrder: 100,
      description: 'High-quality aged basmati rice, perfect for restaurants and food businesses.',
      image: 'https://bsmedia.business-standard.com/_media/bs/img/article/2022-03/21/full/1647851191-8337.jpg',
      status: 'active',
      createdAt: '2025-01-10T10:00:00Z',
      totalInterest: 12,
      individualInterest: 7,
      coopInterest: 5
    },
    {
      id: '2',
      name: 'Organic Mixed Vegetables',
      category: 'Vegetables',
      quantity: 2000,
      unit: 'kg',
      pricePerUnit: 65,
      minimumOrder: 50,
      description: 'Fresh organic vegetables including tomatoes, onions, bell peppers, and leafy greens.',
      image: 'https://meridianfarmmarket.ca/cdn/shop/files/Essential-Veggie-Farmbox.jpg?v=1684275264',
      status: 'active',
      createdAt: '2025-01-12T14:30:00Z',
      totalInterest: 8,
      individualInterest: 5,
      coopInterest: 3
    },
    {
      id: '3',
      name: 'Premium Cooking Oil',
      category: 'Oils',
      quantity: 1500,
      unit: 'liters',
      pricePerUnit: 110,
      minimumOrder: 25,
      description: 'High-quality cooking oil in 5L containers. Perfect for restaurants and catering services.',
      image: 'https://5.imimg.com/data5/SELLER/Default/2024/12/475519602/XQ/MP/SS/133510481/premium-cooking-oil-dispenser-bottle-with-silicone-brush-200ml-glass-round-pastry-brush-500x500.jpeg',
      status: 'active',
      createdAt: '2025-01-08T09:15:00Z',
      totalInterest: 15,
      individualInterest: 9,
      coopInterest: 6
    },
    {
      id: '4',
      name: 'Pure Desi Ghee',
      category: 'Dairy',
      quantity: 800,
      unit: 'kg',
      pricePerUnit: 450,
      minimumOrder: 10,
      description: 'Traditional cow ghee made using bilona method. Rich aroma and taste.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWDcrr3OvjBIprhMpRSCAUiKUdGXLcPvbhIQ&s',
      status: 'active',
      createdAt: '2025-01-14T16:45:00Z',
      totalInterest: 20,
      individualInterest: 12,
      coopInterest: 8
    },
    {
      id: '5',
      name: 'Kerala Spices Mix',
      category: 'Spices',
      quantity: 1200,
      unit: 'kg',
      pricePerUnit: 280,
      minimumOrder: 20,
      description: 'Authentic spices from Kerala - black pepper, cardamom, cinnamon, and other aromatic spices.',
      image: 'https://images.pexels.com/photos/277253/pexels-photo-277253.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'active',
      createdAt: '2025-01-11T11:20:00Z',
      totalInterest: 18,
      individualInterest: 10,
      coopInterest: 8
    },
    {
      id: '6',
      name: 'Premium Pulses Mix',
      category: 'Pulses',
      quantity: 3000,
      unit: 'kg',
      pricePerUnit: 95,
      minimumOrder: 50,
      description: 'High-quality pulses from Madhya Pradesh - toor, chana, masoor, urad, and moong dal.',
      image: 'https://png.pngtree.com/thumb_back/fh260/background/20230906/pngtree-indian-pulses-image_13309412.jpg',
      status: 'active',
      createdAt: '2025-01-09T13:10:00Z',
      totalInterest: 14,
      individualInterest: 8,
      coopInterest: 6
    },
    {
      id: '7',
      name: 'Fresh Seasonal Fruits',
      category: 'Fruits',
      quantity: 1800,
      unit: 'kg',
      pricePerUnit: 55,
      minimumOrder: 30,
      description: 'Fresh seasonal fruits from Maharashtra - grapes, oranges, bananas, apples, and pomegranates.',
      image: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'active',
      createdAt: '2025-01-13T08:30:00Z',
      totalInterest: 11,
      individualInterest: 6,
      coopInterest: 5
    },
    {
      id: '8',
      name: 'Premium Dairy Products',
      category: 'Dairy',
      quantity: 2500,
      unit: 'liters',
      pricePerUnit: 35,
      minimumOrder: 40,
      description: 'Fresh dairy products from Gujarat - milk, curd, paneer, butter, and other dairy items.',
      image: 'https://t4.ftcdn.net/jpg/01/45/60/21/360_F_145602173_05uVexifBuCvWIKvsHGWNuIpPtp5ShkI.jpg',
      status: 'active',
      createdAt: '2025-01-07T15:45:00Z',
      totalInterest: 16,
      individualInterest: 9,
      coopInterest: 7
    }
  ]);

  const [vendorInterests, setVendorInterests] = useState<VendorInterest[]>([
    {
      id: '1',
      productId: '1',
      vendorName: 'Fresh Foods Delhi',
      vendorLocation: 'Delhi NCR',
      vendorRating: 4.8,
      requestedQuantity: 150,
      type: 'individual',
      message: 'Need premium basmati rice for our restaurant chain. Can you provide regular supply?',
      createdAt: '2025-01-15T10:30:00Z',
      status: 'pending'
    },
    {
      id: '2',
      productId: '1',
      vendorName: 'Spice Garden Restaurant',
      vendorLocation: 'Mumbai',
      vendorRating: 4.9,
      requestedQuantity: 200,
      type: 'coop',
      coopMembers: ['Food Corner Delhi', 'Fresh Mart Gurgaon'],
      message: 'We are forming a co-op with 3 restaurants. Total requirement is 500kg.',
      createdAt: '2025-01-14T14:20:00Z',
      status: 'pending'
    },
    {
      id: '3',
      productId: '2',
      vendorName: 'Organic Greens Mumbai',
      vendorLocation: 'Mumbai',
      vendorRating: 4.7,
      requestedQuantity: 100,
      type: 'individual',
      message: 'Looking for consistent supply of organic vegetables for our store.',
      createdAt: '2025-01-13T16:45:00Z',
      status: 'approved'
    },
    {
      id: '4',
      productId: '3',
      vendorName: 'Quick Bites Restaurant',
      vendorLocation: 'Bangalore',
      vendorRating: 4.6,
      requestedQuantity: 75,
      type: 'coop',
      coopMembers: ['Family Kitchen', 'Tasty Treats'],
      message: 'Co-op order for premium cooking oil. We need regular monthly supply.',
      createdAt: '2025-01-12T11:15:00Z',
      status: 'pending'
    },
    {
      id: '5',
      productId: '4',
      vendorName: 'Rajasthani Sweets',
      vendorLocation: 'Jaipur',
      vendorRating: 4.8,
      requestedQuantity: 50,
      type: 'individual',
      message: 'Need pure desi ghee for our sweet shop. Quality is very important.',
      createdAt: '2025-01-11T09:30:00Z',
      status: 'approved'
    },
    {
      id: '6',
      productId: '5',
      vendorName: 'Spice King Kochi',
      vendorLocation: 'Kochi',
      vendorRating: 4.9,
      requestedQuantity: 80,
      type: 'individual',
      message: 'Interested in Kerala spices mix for our spice trading business.',
      createdAt: '2025-01-10T13:20:00Z',
      status: 'pending'
    },
    {
      id: '7',
      productId: '6',
      vendorName: 'Dal Bhandar Indore',
      vendorLocation: 'Indore',
      vendorRating: 4.7,
      requestedQuantity: 120,
      type: 'coop',
      coopMembers: ['Grain Market', 'Pulse Paradise'],
      message: 'Co-op order for premium pulses. We have 3 stores in the group.',
      createdAt: '2025-01-09T15:10:00Z',
      status: 'pending'
    }
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Grains',
    quantity: '',
    unit: 'kg',
    pricePerUnit: '',
    minimumOrder: '',
    description: ''
  });

  const stats = {
    totalProducts: products.length,
    activeProducts: products.filter(p => p.status === 'active').length,
    totalInterests: vendorInterests.length,
    pendingRequests: vendorInterests.filter(i => i.status === 'pending').length,
    approvedDeals: vendorInterests.filter(i => i.status === 'approved').length,
    monthlyRevenue: 4500000
  };

  const handleApproveInterest = (interestId: string) => {
    setVendorInterests(prev => 
      prev.map(interest => 
        interest.id === interestId 
          ? { ...interest, status: 'approved' as const }
          : interest
      )
    );
  };

  const handleRejectInterest = (interestId: string) => {
    setVendorInterests(prev => 
      prev.map(interest => 
        interest.id === interestId 
          ? { ...interest, status: 'rejected' as const }
          : interest
      )
    );
  };

  const handleCreateProduct = () => {
    if (!newProduct.name || !newProduct.quantity || !newProduct.pricePerUnit || !newProduct.minimumOrder) {
      alert('Please fill in all required fields');
      return;
    }

    const product: Product = {
      id: `product${Date.now()}`,
      name: newProduct.name,
      category: newProduct.category,
      quantity: parseFloat(newProduct.quantity),
      unit: newProduct.unit,
      pricePerUnit: parseFloat(newProduct.pricePerUnit),
      minimumOrder: parseFloat(newProduct.minimumOrder),
      description: newProduct.description,
      image: 'https://png.pngtree.com/thumb_back/fh260/background/20230906/pngtree-indian-pulses-image_13309412.jpg',
      status: 'active',
      createdAt: new Date().toISOString(),
      totalInterest: 0,
      individualInterest: 0,
      coopInterest: 0
    };

    setProducts(prev => [product, ...prev]);
    setNewProduct({
      name: '',
      category: 'Grains',
      quantity: '',
      unit: 'kg',
      pricePerUnit: '',
      minimumOrder: '',
      description: ''
    });
    setShowCreateProduct(false);
    alert('Product listed successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse-glow">
              <div className="flex items-center justify-center">
                <span className="text-2xl font-black text-white drop-shadow-lg" style={{ fontFamily: 'Georgia, serif' }}>V</span>
                <span className="text-lg font-bold text-yellow-300 drop-shadow-md ml-0.5" style={{ fontFamily: 'Arial, sans-serif' }}>G</span>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 animate-fade-in-up">Welcome back, {user.name}!</h1>
              <p className="text-gray-600">{user.businessName} • {user.location}</p>
              <div className="flex items-center mt-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600 ml-1">{user.rating} rating • Wholesaler</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-fade-in-up">
            <div className="text-2xl font-bold text-blue-600 mb-1">{stats.totalProducts}</div>
            <div className="text-sm text-gray-600">Total Products</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-fade-in-up delay-100">
            <div className="text-2xl font-bold text-emerald-600 mb-1">{stats.activeProducts}</div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-fade-in-up delay-200">
            <div className="text-2xl font-bold text-purple-600 mb-1">{stats.totalInterests}</div>
            <div className="text-sm text-gray-600">Total Interests</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-fade-in-up delay-300">
            <div className="text-2xl font-bold text-orange-600 mb-1">{stats.pendingRequests}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-fade-in-up delay-400">
            <div className="text-2xl font-bold text-green-600 mb-1">{stats.approvedDeals}</div>
            <div className="text-sm text-gray-600">Approved</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-fade-in-up delay-500">
            <div className="text-2xl font-bold text-green-600 mb-1">₹{stats.monthlyRevenue.toLocaleString()}</div>
            <div className="text-sm text-gray-600">This Month</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'products', label: 'My Products', icon: Package },
            { id: 'interests', label: 'Vendor Interests', icon: Users }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 font-medium rounded-t-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600 transform scale-105'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 animate-fade-in-up">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg hover:shadow-md transition-all duration-300 transform hover:scale-105">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Approved order from Organic Greens Mumbai</div>
                    <div className="text-sm text-gray-600">100kg Organic Mixed Vegetables • 2 hours ago</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg hover:shadow-md transition-all duration-300 transform hover:scale-105">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">New co-op interest from Spice Garden Restaurant</div>
                    <div className="text-sm text-gray-600">500kg Premium Basmati Rice • 4 hours ago</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg hover:shadow-md transition-all duration-300 transform hover:scale-105">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Package className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Listed new product: Premium Dairy Products</div>
                    <div className="text-sm text-gray-600">2500 liters available • 1 day ago</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-orange-50 rounded-lg hover:shadow-md transition-all duration-300 transform hover:scale-105">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Eye className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Individual interest from Quick Bites Restaurant</div>
                    <div className="text-sm text-gray-600">75 liters Premium Cooking Oil • 2 days ago</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-lg hover:shadow-md transition-all duration-300 transform hover:scale-105">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Approved order from Rajasthani Sweets</div>
                    <div className="text-sm text-gray-600">50kg Pure Desi Ghee • 3 days ago</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-indigo-50 rounded-lg hover:shadow-md transition-all duration-300 transform hover:scale-105">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">New interest from Spice King Kochi</div>
                    <div className="text-sm text-gray-600">80kg Kerala Spices Mix • 4 days ago</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-pink-50 rounded-lg hover:shadow-md transition-all duration-300 transform hover:scale-105">
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-pink-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Co-op interest from Dal Bhandar Indore</div>
                    <div className="text-sm text-gray-600">120kg Premium Pulses Mix • 5 days ago</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Chart Placeholder */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 animate-fade-in-up delay-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Performance</h3>
              <div className="h-64 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg flex items-center justify-center hover:shadow-inner transition-all duration-300">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-bounce" />
                  <div className="text-gray-600">Sales analytics coming soon</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Your Products</h3>
              <button 
                onClick={() => setShowCreateProduct(true)}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-fade-in-up">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold text-gray-900">{product.name}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {product.status}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="text-sm text-gray-600">
                        {product.quantity} {product.unit} available
                      </div>
                      <div className="text-lg font-semibold text-gray-900">
                        ₹{product.pricePerUnit} per {product.unit}
                      </div>
                      <div className="text-sm text-gray-500">
                        Min order: {product.minimumOrder} {product.unit}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-blue-600 font-medium">{product.totalInterest} interests</span>
                        <span className="text-gray-500">
                          {product.individualInterest} individual • {product.coopInterest} co-op
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Vendor Interests Tab */}
        {activeTab === 'interests' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Vendor Purchase Interests</h3>
            
            <div className="space-y-4">
              {vendorInterests.map((interest) => {
                const product = products.find(p => p.id === interest.productId);
                return (
                  <div key={interest.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 animate-fade-in-up">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <img
                          src={product?.image || 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=800'}
                          alt={product?.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-900">{interest.vendorName}</h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
                            <MapPin className="w-4 h-4" />
                            <span>{interest.vendorLocation}</span>
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span>{interest.vendorRating}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              interest.type === 'individual' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-purple-100 text-purple-800'
                            }`}>
                              {interest.type === 'individual' ? 'Individual' : 'Co-op'}
                            </span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              interest.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              interest.status === 'approved' ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {interest.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          {interest.requestedQuantity} {product?.unit}
                        </div>
                        <div className="text-sm text-gray-600">
                          ₹{((interest.requestedQuantity * (product?.pricePerUnit || 0))).toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h5 className="font-medium text-gray-900 mb-2">Product: {product?.name}</h5>
                      {interest.type === 'coop' && interest.coopMembers && (
                        <div className="mb-2">
                          <span className="text-sm font-medium text-gray-700">Co-op Members: </span>
                          <span className="text-sm text-gray-600">{interest.coopMembers.join(', ')}</span>
                        </div>
                      )}
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm font-medium text-gray-700 mb-1">Message:</div>
                        <div className="text-sm text-gray-600">{interest.message}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        <Clock className="w-4 h-4 inline mr-1" />
                        {new Date(interest.createdAt).toLocaleDateString('en-IN', { 
                          day: 'numeric', 
                          month: 'short', 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                      
                      {interest.status === 'pending' && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleApproveInterest(interest.id)}
                            className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-all duration-200 flex items-center space-x-1"
                          >
                            <Check className="w-4 h-4" />
                            <span>Approve</span>
                          </button>
                          <button
                            onClick={() => handleRejectInterest(interest.id)}
                            className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-all duration-200 flex items-center space-x-1"
                          >
                            <X className="w-4 h-4" />
                            <span>Reject</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Create Product Modal */}
      {showCreateProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
                <button
                  onClick={() => setShowCreateProduct(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="e.g., Premium Basmati Rice"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="Grains">Grains & Rice</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Spices">Spices</option>
                    <option value="Dairy">Dairy Products</option>
                    <option value="Oils">Cooking Oils</option>
                    <option value="Pulses">Pulses</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    value={newProduct.quantity}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, quantity: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="1000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unit
                  </label>
                  <select
                    value={newProduct.unit}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, unit: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="kg">Kilograms</option>
                    <option value="liters">Liters</option>
                    <option value="pieces">Pieces</option>
                    <option value="boxes">Boxes</option>
                    <option value="bags">Bags</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price per Unit (₹) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={newProduct.pricePerUnit}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, pricePerUnit: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="85.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Order Quantity *
                </label>
                <input
                  type="number"
                  value={newProduct.minimumOrder}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, minimumOrder: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Describe your product, quality, storage conditions, etc."
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
              <button
                onClick={() => setShowCreateProduct(false)}
                className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProduct}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}