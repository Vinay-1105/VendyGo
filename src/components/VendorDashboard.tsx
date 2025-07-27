import React, { useState } from 'react';
import { User, Package, MessageSquare, TrendingUp, Star, MapPin, Calendar, DollarSign, Eye, Edit, Trash2, Plus, X, Save } from 'lucide-react';
import type { User as UserType } from '../App';
import { WholesalerDashboard } from './WholesalerDashboard';

interface VendorDashboardProps {
  user: UserType;
}

interface Listing {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  quality: string;
  price: number;
  status: 'active' | 'expired' | 'traded';
  views: number;
  interested: number;
  createdAt: string;
}

export function VendorDashboard({ user }: VendorDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreateListing, setShowCreateListing] = useState(false);
  const [editingListing, setEditingListing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Listing>>({});
  
  // Return wholesaler dashboard if user is wholesaler
  if (user.role === 'wholesaler') {
    return <WholesalerDashboard user={user} />;
  }

  const [mockListings, setMockListings] = useState<Listing[]>([
    {
      id: '1',
      name: 'Fresh Red Onions',
      quantity: 50,
      unit: 'kg',
      quality: 'Fresh',
      price: 2.50,
      status: 'active',
      views: 24,
      interested: 3,
      createdAt: '2025-01-15'
    },
    {
      id: '2',
      name: 'Organic Tomatoes',
      quantity: 30,
      unit: 'kg',
      quality: 'Premium',
      price: 4.00,
      status: 'active',
      views: 18,
      interested: 2,
      createdAt: '2025-01-14'
    },
    {
      id: '3',
      name: 'Fresh Potatoes',
      quantity: 100,
      unit: 'kg',
      quality: 'Standard',
      price: 1.80,
      status: 'traded',
      views: 45,
      interested: 7,
      createdAt: '2025-01-10'
    },
    {
      id: '4',
      name: 'Basmati Rice',
      quantity: 75,
      unit: 'kg',
      quality: 'Premium',
      price: 85.00,
      status: 'active',
      views: 32,
      interested: 5,
      createdAt: '2025-01-13'
    },
    {
      id: '5',
      name: 'Pure Desi Ghee',
      quantity: 25,
      unit: 'kg',
      quality: 'Premium',
      price: 450.00,
      status: 'active',
      views: 28,
      interested: 4,
      createdAt: '2025-01-12'
    },
    {
      id: '6',
      name: 'Turmeric Powder',
      quantity: 40,
      unit: 'kg',
      quality: 'Organic',
      price: 180.00,
      status: 'active',
      views: 19,
      interested: 2,
      createdAt: '2025-01-11'
    },
    {
      id: '7',
      name: 'Coriander Seeds',
      quantity: 60,
      unit: 'kg',
      quality: 'Fresh',
      price: 120.00,
      status: 'traded',
      views: 41,
      interested: 6,
      createdAt: '2025-01-09'
    },
    {
      id: '8',
      name: 'Mustard Oil',
      quantity: 35,
      unit: 'liters',
      quality: 'Pure',
      price: 140.00,
      status: 'active',
      views: 26,
      interested: 3,
      createdAt: '2025-01-08'
    },
    {
      id: '9',
      name: 'Fresh Green Chilies',
      quantity: 20,
      unit: 'kg',
      quality: 'Fresh',
      price: 80.00,
      status: 'active',
      views: 15,
      interested: 2,
      createdAt: '2025-01-07'
    },
    {
      id: '10',
      name: 'Organic Wheat Flour',
      quantity: 80,
      unit: 'kg',
      quality: 'Organic',
      price: 45.00,
      status: 'active',
      views: 22,
      interested: 3,
      createdAt: '2025-01-06'
    },
    {
      id: '11',
      name: 'Fresh Ginger',
      quantity: 15,
      unit: 'kg',
      quality: 'Fresh',
      price: 90.00,
      status: 'traded',
      views: 18,
      interested: 4,
      createdAt: '2025-01-05'
    },
    {
      id: '12',
      name: 'Coconut Oil',
      quantity: 25,
      unit: 'liters',
      quality: 'Pure',
      price: 180.00,
      status: 'active',
      views: 20,
      interested: 2,
      createdAt: '2025-01-04'
    },
    {
      id: '13',
      name: 'Organic Jaggery',
      quantity: 30,
      unit: 'kg',
      quality: 'Organic',
      price: 120.00,
      status: 'active',
      views: 16,
      interested: 3,
      createdAt: '2025-01-03'
    },
    {
      id: '14',
      name: 'Premium Tea Leaves',
      quantity: 10,
      unit: 'kg',
      quality: 'Premium',
      price: 350.00,
      status: 'active',
      views: 25,
      interested: 5,
      createdAt: '2025-01-02'
    },
    {
      id: '15',
      name: 'Fresh Mint Leaves',
      quantity: 8,
      unit: 'kg',
      quality: 'Fresh',
      price: 150.00,
      status: 'traded',
      views: 12,
      interested: 2,
      createdAt: '2025-01-01'
    }
  ]);

  const [newListing, setNewListing] = useState({
    name: '',
    quantity: '',
    unit: 'kg',
    quality: 'Fresh',
    price: ''
  });

  const [profileForm, setProfileForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    businessName: user.businessName,
    location: user.location,
    description: '',
    website: '',
    specialties: ''
  });

  const stats = {
    totalListings: mockListings.length,
    activeListings: mockListings.filter(l => l.status === 'active').length,
    totalViews: mockListings.reduce((sum, l) => sum + l.views, 0),
    completedTrades: mockListings.filter(l => l.status === 'traded').length,
    monthlyRevenue: 125000.00,
    avgRating: user.rating
  };

  const handleCreateListing = () => {
    if (!newListing.name || !newListing.quantity || !newListing.price) {
      alert('Please fill in all required fields');
      return;
    }

    const listing: Listing = {
      id: `listing${Date.now()}`,
      name: newListing.name,
      quantity: parseFloat(newListing.quantity),
      unit: newListing.unit,
      quality: newListing.quality,
      price: parseFloat(newListing.price),
      status: 'active',
      views: 0,
      interested: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setMockListings(prev => [listing, ...prev]);
    setNewListing({
      name: '',
      quantity: '',
      unit: 'kg',
      quality: 'Fresh',
      price: ''
    });
    setShowCreateListing(false);
    alert('Listing created successfully!');
  };

  const handleEditListing = (listing: Listing) => {
    setEditingListing(listing.id);
    setEditForm({
      name: listing.name,
      quantity: listing.quantity,
      unit: listing.unit,
      quality: listing.quality,
      price: listing.price
    });
  };

  const handleSaveEdit = (listingId: string) => {
    if (!editForm.name || !editForm.quantity || !editForm.price) {
      alert('Please fill in all required fields');
      return;
    }

    setMockListings(prev => 
      prev.map(listing => 
        listing.id === listingId 
          ? {
              ...listing,
              name: editForm.name!,
              quantity: editForm.quantity!,
              unit: editForm.unit!,
              quality: editForm.quality!,
              price: editForm.price!
            }
          : listing
      )
    );
    setEditingListing(null);
    setEditForm({});
    alert('Listing updated successfully!');
  };

  const handleCancelEdit = () => {
    setEditingListing(null);
    setEditForm({});
  };

  const handleDeleteListing = (listingId: string) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      setMockListings(prev => prev.filter(listing => listing.id !== listingId));
      alert('Listing deleted successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse-glow">
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
                <span className="text-sm text-gray-600 ml-1">{user.rating} rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-fade-in-up">
            <div className="text-2xl font-bold text-blue-600 mb-1">{stats.totalListings}</div>
            <div className="text-sm text-gray-600">Total Listings</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-fade-in-up delay-100">
            <div className="text-2xl font-bold text-emerald-600 mb-1">{stats.activeListings}</div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-fade-in-up delay-200">
            <div className="text-2xl font-bold text-purple-600 mb-1">{stats.totalViews}</div>
            <div className="text-sm text-gray-600">Total Views</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-fade-in-up delay-300">
            <div className="text-2xl font-bold text-orange-600 mb-1">{stats.completedTrades}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-fade-in-up delay-400">
            <div className="text-2xl font-bold text-green-600 mb-1">₹{stats.monthlyRevenue.toLocaleString()}</div>
            <div className="text-sm text-gray-600">This Month</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-fade-in-up delay-500">
            <div className="text-2xl font-bold text-yellow-600 mb-1">{stats.avgRating}</div>
            <div className="text-sm text-gray-600">Avg Rating</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'listings', label: 'My Listings', icon: Package },
            { id: 'messages', label: 'Messages', icon: MessageSquare },
            { id: 'profile', label: 'Profile', icon: User }
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
                <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg hover:shadow-md transition-all duration-300 transform hover:scale-105">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">New message about Premium Red Onions</div>
                    <div className="text-sm text-gray-600">2 hours ago</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg hover:shadow-md transition-all duration-300 transform hover:scale-105">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Package className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Fresh Potatoes trade completed</div>
                    <div className="text-sm text-gray-600">1 day ago</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg hover:shadow-md transition-all duration-300 transform hover:scale-105">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Eye className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Your Basmati Rice listing got 8 new views</div>
                    <div className="text-sm text-gray-600">2 days ago</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-orange-50 rounded-lg hover:shadow-md transition-all duration-300 transform hover:scale-105">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Package className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Coriander Seeds trade completed successfully</div>
                    <div className="text-sm text-gray-600">3 days ago</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-lg hover:shadow-md transition-all duration-300 transform hover:scale-105">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Interest shown in your Turmeric Powder</div>
                    <div className="text-sm text-gray-600">4 days ago</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-indigo-50 rounded-lg hover:shadow-md transition-all duration-300 transform hover:scale-105">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Eye className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Mustard Oil listing viewed 12 times today</div>
                    <div className="text-sm text-gray-600">5 days ago</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-pink-50 rounded-lg hover:shadow-md transition-all duration-300 transform hover:scale-105">
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                    <Package className="w-5 h-5 text-pink-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">New bulk deal opportunity for Desi Ghee</div>
                    <div className="text-sm text-gray-600">6 days ago</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Chart Placeholder */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 animate-fade-in-up delay-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
              <div className="h-64 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-lg flex items-center justify-center hover:shadow-inner transition-all duration-300">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-bounce" />
                  <div className="text-gray-600">Performance chart coming soon</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Listings Tab */}
        {activeTab === 'listings' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Your Listings</h3>
              <button 
                onClick={() => setShowCreateListing(true)}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Plus className="w-4 h-4 inline mr-2" />
                Create New Listing
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {mockListings.map((listing) => (
                <div key={listing.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-fade-in-up flex flex-col">
                  <div className="aspect-video overflow-hidden flex-shrink-0">
                    <img
                      src={
                        listing.name.includes('Red Onions') ? 'https://plantix.net/en/library/assets/custom/crop-images/onion.jpeg' :
                        listing.name.includes('Tomato') ? 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=800' :
                        listing.name.includes('Potato') ? 'https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=800' :
                        listing.name.includes('Rice') ? 'https://flourworks.in/wp-content/uploads/2023/06/1-12.jpeg' :
                        listing.name.includes('Ghee') ? 'https://admcart.com/wp-content/uploads/2024/11/412hqmi5L._AC_UF10001000_QL80_.jpg' :
                        listing.name.includes('Turmeric') ? 'https://info.ehl.edu/hubfs/EHL-Passugg_Blog_Kurkuma_Titelbild_001.jpg' :
                        listing.name.includes('Coriander') ? 'https://www.greendna.in/cdn/shop/products/edible-gardening-101-harvesting-coriander-seeds-2-corriander-seeds-leaves-powder.jpg?v=1561042220' :
                        listing.name.includes('Oil') ? 'https://images.ctfassets.net/j6utfne5ne6b/3ioUSU0JAlUJTpE5O6nc2v/e3498abb9aa67cd2705b9d8c6f44169a/mustard-oil-for-dandruff.jpg?fm=webp&q=70' :
                        listing.name.includes('Chilies') ? 'https://www.greendna.in/cdn/shop/products/green_chilli.jpg?v=1562414368' :
                        listing.name.includes('Flour') ? 'https://images.jdmagicbox.com/quickquotes/images_main/organic-wheat-flour-3te-1kg-2022114078-5m48giir.jpg' :
                        listing.name.includes('Ginger') ? 'https://images.pexels.com/photos/161556/ginger-plant-asia-rhizome-161556.jpeg?auto=compress&cs=tinysrgb&w=800' :
                        listing.name.includes('Jaggery') ? 'https://www.greendna.in/cdn/shop/files/IMG_9609.jpg?v=1684468916' :
                        listing.name.includes('Tea') ? 'https://teacultureoftheworld.com/cdn/shop/articles/tea-leaves-collection-on-wooden-board-2022-01-18-23-42-23-utc.jpg?v=1697529827&width=600' :
                        listing.name.includes('Mint') ? 'https://ranibrand.com/cdn/shop/files/81cVMdZyScL_1200x864.jpg?v=1716960054' :
                        'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=800'
                      }
                      alt={listing.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="p-3 md:p-4 flex-1 flex flex-col">
                    {editingListing === listing.id ? (
                      // Edit Mode
                      <div className="space-y-3 flex-1">
                        <input
                          type="text"
                          value={editForm.name || ''}
                          onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Product name"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="number"
                            value={editForm.quantity || ''}
                            onChange={(e) => setEditForm(prev => ({ ...prev, quantity: parseFloat(e.target.value) || 0 }))}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Quantity"
                          />
                          <select
                            value={editForm.unit || 'kg'}
                            onChange={(e) => setEditForm(prev => ({ ...prev, unit: e.target.value }))}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="kg">kg</option>
                            <option value="liters">liters</option>
                            <option value="pieces">pieces</option>
                            <option value="boxes">boxes</option>
                          </select>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <select
                            value={editForm.quality || 'Fresh'}
                            onChange={(e) => setEditForm(prev => ({ ...prev, quality: e.target.value }))}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="Fresh">Fresh</option>
                            <option value="Good">Good</option>
                            <option value="Excellent">Excellent</option>
                            <option value="Premium">Premium</option>
                          </select>
                          <input
                            type="number"
                            step="0.01"
                            value={editForm.price || ''}
                            onChange={(e) => setEditForm(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Price"
                          />
                        </div>
                        <div className="flex space-x-2 mt-auto">
                          <button
                            onClick={() => handleSaveEdit(listing.id)}
                            className="flex-1 px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-1"
                          >
                            <Save className="w-3 h-3" />
                            <span>Save</span>
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="flex-1 px-3 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-1"
                          >
                            <X className="w-3 h-3" />
                            <span>Cancel</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      // View Mode
                      <>
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-semibold text-gray-900 text-sm md:text-base line-clamp-2">{listing.name}</h4>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full flex-shrink-0 ml-2 ${
                            listing.status === 'active' ? 'bg-green-100 text-green-800' :
                            listing.status === 'traded' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {listing.status}
                          </span>
                        </div>
                        
                        <div className="space-y-2 mb-4 flex-1">
                          <div className="text-xs md:text-sm text-gray-600">
                            {listing.quantity} {listing.unit} • {listing.quality}
                          </div>
                          <div className="text-base md:text-lg font-semibold text-gray-900">
                            ₹{listing.price} per {listing.unit}
                          </div>
                          <div className="flex items-center justify-between text-xs md:text-sm text-gray-500">
                            <span>{listing.views} views</span>
                            <span>{listing.interested} interested</span>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2 mt-auto">
                          <button 
                            onClick={() => handleEditListing(listing)}
                            className="flex-1 px-3 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-1 text-xs md:text-sm"
                          >
                            <Edit className="w-3 h-3 md:w-4 md:h-4" />
                            <span>Edit</span>
                          </button>
                          <button 
                            onClick={() => handleDeleteListing(listing.id)}
                            className="flex-1 px-3 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-1 text-xs md:text-sm"
                          >
                            <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center animate-fade-in-up">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Messages</h3>
            <p className="text-gray-600 mb-4">
              All your conversations with other vendors will appear here
            </p>
            <div className="text-sm text-gray-500">
              No messages yet. Start trading to begin conversations!
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 animate-fade-in-up">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:shadow-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:shadow-lg"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:shadow-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Name
                    </label>
                    <input
                      type="text"
                      value={profileForm.businessName}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, businessName: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:shadow-lg"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={profileForm.location}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:shadow-lg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Description
                  </label>
                  <textarea
                    value={profileForm.description}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Tell other vendors about your business..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:shadow-lg"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website (Optional)
                    </label>
                    <input
                      type="url"
                      value={profileForm.website}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, website: e.target.value }))}
                      placeholder="https://your-website.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:shadow-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Specialties
                    </label>
                    <input
                      type="text"
                      value={profileForm.specialties}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, specialties: e.target.value }))}
                      placeholder="e.g., Organic vegetables, Rice products, Spices"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:shadow-lg"
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Update Profile
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Create New Listing Modal */}
      {showCreateListing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Create New Listing</h2>
                <button
                  onClick={() => setShowCreateListing(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={newListing.name}
                  onChange={(e) => setNewListing(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="e.g., Fresh Red Onions"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    value={newListing.quantity}
                    onChange={(e) => setNewListing(prev => ({ ...prev, quantity: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unit
                  </label>
                  <select
                    value={newListing.unit}
                    onChange={(e) => setNewListing(prev => ({ ...prev, unit: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="kg">kg</option>
                    <option value="liters">liters</option>
                    <option value="pieces">pieces</option>
                    <option value="boxes">boxes</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quality
                  </label>
                  <select
                    value={newListing.quality}
                    onChange={(e) => setNewListing(prev => ({ ...prev, quality: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="Fresh">Fresh</option>
                    <option value="Good">Good</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price per Unit (₹) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={newListing.price}
                    onChange={(e) => setNewListing(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="40.00"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
              <button
                onClick={() => setShowCreateListing(false)}
                className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateListing}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Create Listing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}