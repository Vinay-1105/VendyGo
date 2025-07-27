import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Eye, MessageSquare, Star, MapPin, Clock, Package, ArrowRight, X, Check, AlertCircle, Camera, Upload } from 'lucide-react';
import type { User } from '../App';

interface TradeSectionProps {
  user: User;
}

interface TradeItem {
  id: string;
  vendorId: string;
  vendorName: string;
  vendorRating: number;
  vendorLocation: string;
  productName: string;
  category: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  totalValue: number;
  condition: string;
  description: string;
  images: string[];
  createdAt: string;
  expiresAt: string;
  isActive: boolean;
  views: number;
  interested: number;
  tradeConditions: string;
}

interface TradeProposal {
  id: string;
  fromVendorId: string;
  toVendorId: string;
  requestedItem: TradeItem;
  offeredItems: TradeItem[];
  message: string;
  status: 'pending' | 'accepted' | 'declined' | 'counter';
  createdAt: string;
  totalOfferedValue: number;
}

export function TradeSection({ user }: TradeSectionProps) {
  const [activeTab, setActiveTab] = useState('browse');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showCreateListing, setShowCreateListing] = useState(false);
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TradeItem | null>(null);
  const [selectedOfferItems, setSelectedOfferItems] = useState<TradeItem[]>([]);
  const [tradeMessage, setTradeMessage] = useState('');

  // Mock data for trade listings
  const [tradeListings, setTradeListings] = useState<TradeItem[]>([
    {
      id: '1',
      vendorId: 'vendor1',
      vendorName: 'Fresh Foods Delhi',
      vendorRating: 4.8,
      vendorLocation: 'Delhi NCR',
      productName: 'Premium Basmati Rice',
      category: 'grains',
      quantity: 50,
      unit: 'kg',
      pricePerUnit: 120,
      totalValue: 6000,
      condition: 'Excellent',
      description: 'High-quality aged basmati rice, perfect for restaurants. Stored in climate-controlled environment.',
      images: ['https://flourworks.in/wp-content/uploads/2023/06/1-12.jpeg'],
      createdAt: '2025-01-15T10:00:00Z',
      expiresAt: '2025-01-25T10:00:00Z',
      isActive: true,
      views: 45,
      interested: 8,
      tradeConditions: 'Looking for vegetables or spices of equivalent value'
    },
    {
      id: '2',
      vendorId: 'vendor2',
      vendorName: 'Organic Greens Mumbai',
      vendorRating: 4.9,
      vendorLocation: 'Mumbai',
      productName: 'Fresh Organic Tomatoes',
      category: 'vegetables',
      quantity: 30,
      unit: 'kg',
      pricePerUnit: 80,
      totalValue: 2400,
      condition: 'Fresh',
      description: 'Farm-fresh organic tomatoes, harvested yesterday. Perfect for restaurants and cafes.',
      images: ['https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=800'],
      createdAt: '2025-01-14T15:30:00Z',
      expiresAt: '2025-01-20T15:30:00Z',
      isActive: true,
      views: 32,
      interested: 5,
      tradeConditions: 'Open to trade for grains, dairy, or cooking oils'
    },
    {
      id: '3',
      vendorId: 'vendor3',
      vendorName: 'Spice King Kochi',
      vendorRating: 4.7,
      vendorLocation: 'Kochi',
      productName: 'Premium Black Pepper',
      category: 'spices',
      quantity: 10,
      unit: 'kg',
      pricePerUnit: 800,
      totalValue: 8000,
      condition: 'Premium',
      description: 'Authentic Kerala black pepper, freshly ground. High piperine content for maximum flavor.',
      images: ['https://akm-img-a-in.tosshub.com/sites/rd/resources/202006/blackpepper_1591428421_1200x675.png'],
      createdAt: '2025-01-13T09:15:00Z',
      expiresAt: '2025-01-28T09:15:00Z',
      isActive: true,
      views: 67,
      interested: 12,
      tradeConditions: 'Prefer to trade for rice, oil, or other premium spices'
    },
    {
      id: '4',
      vendorId: 'vendor4',
      vendorName: 'Dairy Fresh Bangalore',
      vendorRating: 4.6,
      vendorLocation: 'Bangalore',
      productName: 'Pure Desi Ghee',
      category: 'dairy',
      quantity: 20,
      unit: 'kg',
      pricePerUnit: 450,
      totalValue: 9000,
      condition: 'Premium',
      description: 'Traditional cow ghee made using bilona method. Rich aroma and taste, perfect for cooking.',
      images: ['https://admcart.com/wp-content/uploads/2024/11/412hqmi5L._AC_UF10001000_QL80_.jpg'],
      createdAt: '2025-01-12T14:20:00Z',
      expiresAt: '2025-01-27T14:20:00Z',
      isActive: true,
      views: 89,
      interested: 15,
      tradeConditions: 'Looking for vegetables, fruits, or grains'
    },
    {
      id: '5',
      vendorId: 'vendor5',
      vendorName: 'Oil Mills Rajasthan',
      vendorRating: 4.5,
      vendorLocation: 'Jaipur',
      productName: 'Cold Pressed Mustard Oil',
      category: 'oils',
      quantity: 40,
      unit: 'liters',
      pricePerUnit: 150,
      totalValue: 6000,
      condition: 'Fresh',
      description: 'Traditional cold-pressed mustard oil. No chemicals or preservatives. Great for cooking and health.',
      images: ['https://images.ctfassets.net/j6utfne5ne6b/3ioUSU0JAlUJTpE5O6nc2v/e3498abb9aa67cd2705b9d8c6f44169a/mustard-oil-for-dandruff.jpg?fm=webp&q=70'],
      createdAt: '2025-01-11T11:45:00Z',
      expiresAt: '2025-01-26T11:45:00Z',
      isActive: true,
      views: 54,
      interested: 9,
      tradeConditions: 'Open to trade for spices, grains, or dairy products'
    }
  ]);

  // Mock user's own listings
  const [myListings, setMyListings] = useState<TradeItem[]>([
    {
      id: 'my1',
      vendorId: user.id,
      vendorName: user.businessName,
      vendorRating: user.rating,
      vendorLocation: user.location,
      productName: 'Fresh Red Onions',
      category: 'vegetables',
      quantity: 25,
      unit: 'kg',
      pricePerUnit: 40,
      totalValue: 1000,
      condition: 'Fresh',
      description: 'Farm-fresh red onions, perfect for restaurants and food businesses.',
      images: ['https://plantix.net/en/library/assets/custom/crop-images/onion.jpeg'],
      createdAt: '2025-01-10T08:30:00Z',
      expiresAt: '2025-01-25T08:30:00Z',
      isActive: true,
      views: 23,
      interested: 4,
      tradeConditions: 'Looking for rice, oil, or spices'
    },
    {
      id: 'my2',
      vendorId: user.id,
      vendorName: user.businessName,
      vendorRating: user.rating,
      vendorLocation: user.location,
      productName: 'Organic Wheat Flour',
      category: 'grains',
      quantity: 40,
      unit: 'kg',
      pricePerUnit: 45,
      totalValue: 1800,
      condition: 'Fresh',
      description: 'Stone-ground organic wheat flour, perfect for bakeries.',
      images: ['https://images.jdmagicbox.com/quickquotes/images_main/organic-wheat-flour-3te-1kg-2022114078-5m48giir.jpg'],
      createdAt: '2025-01-12T10:15:00Z',
      expiresAt: '2025-01-27T10:15:00Z',
      isActive: true,
      views: 18,
      interested: 3,
      tradeConditions: 'Looking for vegetables or dairy products'
    },
    {
      id: 'my3',
      vendorId: user.id,
      vendorName: user.businessName,
      vendorRating: user.rating,
      vendorLocation: user.location,
      productName: 'Fresh Mint Leaves',
      category: 'herbs',
      quantity: 5,
      unit: 'kg',
      pricePerUnit: 150,
      totalValue: 750,
      condition: 'Fresh',
      description: 'Fresh mint leaves grown organically, perfect for beverages.',
      images: ['https://ranibrand.com/cdn/shop/files/81cVMdZyScL_1200x864.jpg?v=1716960054'],
      createdAt: '2025-01-14T14:20:00Z',
      expiresAt: '2025-01-29T14:20:00Z',
      isActive: true,
      views: 12,
      interested: 2,
      tradeConditions: 'Looking for spices or cooking oils'
    }
  ]);

  const [tradeProposals, setTradeProposals] = useState<TradeProposal[]>([]);

  const [newListing, setNewListing] = useState({
    productName: '',
    category: 'vegetables',
    quantity: '',
    unit: 'kg',
    pricePerUnit: '',
    condition: 'Fresh',
    description: '',
    tradeConditions: '',
    images: [] as string[]
  });

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'vegetables', label: 'Vegetables' },
    { id: 'fruits', label: 'Fruits' },
    { id: 'grains', label: 'Grains & Rice' },
    { id: 'spices', label: 'Spices' },
    { id: 'dairy', label: 'Dairy Products' },
    { id: 'oils', label: 'Cooking Oils' }
  ];

  const conditions = ['Fresh', 'Good', 'Excellent', 'Premium'];
  const units = ['kg', 'liters', 'pieces', 'boxes', 'bags'];

  // Filter and sort listings
  const filteredListings = tradeListings
    .filter(item => 
      item.vendorId !== user.id && // Don't show user's own listings
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === 'all' || item.category === categoryFilter) &&
      item.isActive
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'price-low':
          return a.pricePerUnit - b.pricePerUnit;
        case 'price-high':
          return b.pricePerUnit - a.pricePerUnit;
        case 'popular':
          return b.views - a.views;
        default:
          return 0;
      }
    });

  const handleCreateListing = () => {
    if (!newListing.productName || !newListing.quantity || !newListing.pricePerUnit) {
      alert('Please fill in all required fields');
      return;
    }

    const listing: TradeItem = {
      id: `my${Date.now()}`,
      vendorId: user.id,
      vendorName: user.businessName,
      vendorRating: user.rating,
      vendorLocation: user.location,
      productName: newListing.productName,
      category: newListing.category,
      quantity: parseFloat(newListing.quantity),
      unit: newListing.unit,
      pricePerUnit: parseFloat(newListing.pricePerUnit),
      totalValue: parseFloat(newListing.quantity) * parseFloat(newListing.pricePerUnit),
      condition: newListing.condition,
      description: newListing.description,
      images: newListing.images.length > 0 ? newListing.images : ['https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=800'],
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days
      isActive: true,
      views: 0,
      interested: 0,
      tradeConditions: newListing.tradeConditions
    };

    setMyListings(prev => [listing, ...prev]);
    setNewListing({
      productName: '',
      category: 'vegetables',
      quantity: '',
      unit: 'kg',
      pricePerUnit: '',
      condition: 'Fresh',
      description: '',
      tradeConditions: '',
      images: []
    });
    setShowCreateListing(false);
    alert('Listing created successfully!');
  };

  const handleTradeProposal = () => {
    if (!selectedItem || selectedOfferItems.length === 0) {
      alert('Please select items to offer in trade');
      return;
    }

    const totalOfferedValue = selectedOfferItems.reduce((sum, item) => sum + item.totalValue, 0);
    const valueRatio = totalOfferedValue / selectedItem.totalValue;

    if (valueRatio < 0.8) {
      alert('The total value of offered items should be at least 80% of the requested item value');
      return;
    }

    const proposal: TradeProposal = {
      id: `proposal${Date.now()}`,
      fromVendorId: user.id,
      toVendorId: selectedItem.vendorId,
      requestedItem: selectedItem,
      offeredItems: selectedOfferItems,
      message: tradeMessage,
      status: 'pending',
      createdAt: new Date().toISOString(),
      totalOfferedValue
    };

    setTradeProposals(prev => [proposal, ...prev]);
    setShowTradeModal(false);
    setSelectedItem(null);
    setSelectedOfferItems([]);
    setTradeMessage('');
    alert('Trade proposal sent successfully!');
  };

  const toggleOfferItem = (item: TradeItem) => {
    setSelectedOfferItems(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        return prev.filter(i => i.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-pink-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-poppins animate-fade-in-up">
            Trade Hub
          </h1>
          <p className="text-xl text-gray-600 animate-fade-in-up delay-200">
            Trade surplus inventory with other vendors in your network
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
          {[
            { id: 'browse', label: 'Browse Listings', icon: Search },
            { id: 'my-listings', label: 'My Listings', icon: Package },
            { id: 'proposals', label: 'Trade Proposals', icon: MessageSquare }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 font-medium rounded-t-xl transition-all duration-300 transform hover:scale-105 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-orange-600 to-purple-600 text-white shadow-lg transform -translate-y-1'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Browse Listings Tab */}
        {activeTab === 'browse' && (
          <div className="space-y-8">
            {/* Filters */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.label}</option>
                  ))}
                </select>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                </select>
                
                <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-orange-600 to-purple-600 text-white rounded-xl hover:from-orange-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  <Filter className="w-5 h-5" />
                  <span>Apply Filters</span>
                </button>
              </div>
            </div>

            {/* Listings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredListings.map((item) => (
                <div key={item.id} className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up">
                  {/* Product Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.images[0]}
                      alt={item.productName}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700">
                      {item.condition}
                    </div>
                    <div className="absolute bottom-4 left-4 flex items-center space-x-2 text-white">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">{item.views}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{item.productName}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{item.vendorLocation}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-purple-600">₹{item.pricePerUnit}</div>
                        <div className="text-sm text-gray-500">per {item.unit}</div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Quantity:</span>
                        <span className="font-semibold">{item.quantity} {item.unit}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Value:</span>
                        <span className="font-bold text-green-600">₹{item.totalValue.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{item.vendorRating} • {item.vendorName}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                      <div className="bg-orange-50 p-3 rounded-lg">
                        <div className="text-xs font-medium text-orange-800 mb-1">Trade Conditions:</div>
                        <div className="text-sm text-orange-700">{item.tradeConditions}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedItem(item);
                        setShowTradeModal(true);
                      }}
                      className="w-full px-6 py-3 bg-gradient-to-r from-orange-600 to-purple-600 text-white font-semibold rounded-xl hover:from-orange-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Propose Trade</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* My Listings Tab */}
        {activeTab === 'my-listings' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">My Trade Listings</h2>
              <button
                onClick={() => setShowCreateListing(true)}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-purple-600 text-white font-semibold rounded-xl hover:from-orange-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Listing</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {myListings.map((item) => (
                <div key={item.id} className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.images[0]}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 px-3 py-1 bg-green-500 text-white rounded-full text-sm font-medium">
                      Active
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{item.productName}</h3>
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Quantity:</span>
                        <span className="font-semibold">{item.quantity} {item.unit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price:</span>
                        <span className="font-semibold">₹{item.pricePerUnit} per {item.unit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Views:</span>
                        <span className="font-semibold">{item.views}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Interested:</span>
                        <span className="font-semibold text-green-600">{item.interested}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200">
                        Edit
                      </button>
                      <button className="flex-1 px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-all duration-200">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trade Proposals Tab */}
        {activeTab === 'proposals' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Trade Proposals</h2>
            
            {tradeProposals.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl shadow-xl border border-gray-200 text-center">
                <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Trade Proposals Yet</h3>
                <p className="text-gray-600">
                  Start browsing listings and propose trades to see your proposals here.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {tradeProposals.map((proposal) => (
                  <div key={proposal.id} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                          proposal.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          proposal.status === 'accepted' ? 'bg-green-100 text-green-800' :
                          proposal.status === 'declined' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(proposal.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Requested Item</h4>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="font-medium">{proposal.requestedItem.productName}</div>
                          <div className="text-sm text-gray-600">
                            {proposal.requestedItem.quantity} {proposal.requestedItem.unit} • 
                            ₹{proposal.requestedItem.totalValue.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Offered Items</h4>
                        <div className="space-y-2">
                          {proposal.offeredItems.map((item, index) => (
                            <div key={index} className="bg-gray-50 p-3 rounded-lg">
                              <div className="font-medium text-sm">{item.productName}</div>
                              <div className="text-xs text-gray-600">
                                {item.quantity} {item.unit} • ₹{item.totalValue.toLocaleString()}
                              </div>
                            </div>
                          ))}
                          <div className="text-sm font-semibold text-green-600">
                            Total Offered: ₹{proposal.totalOfferedValue.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>

                    {proposal.message && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <div className="text-sm font-medium text-blue-900 mb-1">Message:</div>
                        <div className="text-sm text-blue-800">{proposal.message}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Create Listing Modal */}
      {showCreateListing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Create New Listing</h2>
                <button
                  onClick={() => setShowCreateListing(false)}
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
                    value={newListing.productName}
                    onChange={(e) => setNewListing(prev => ({ ...prev, productName: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    placeholder="e.g., Premium Basmati Rice"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={newListing.category}
                    onChange={(e) => setNewListing(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  >
                    {categories.slice(1).map(category => (
                      <option key={category.id} value={category.id}>{category.label}</option>
                    ))}
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
                    value={newListing.quantity}
                    onChange={(e) => setNewListing(prev => ({ ...prev, quantity: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  >
                    {units.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price per Unit (₹) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={newListing.pricePerUnit}
                    onChange={(e) => setNewListing(prev => ({ ...prev, pricePerUnit: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    placeholder="120.00"
                  />
                </div>
              </div>

              {newListing.quantity && newListing.pricePerUnit && (
                <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                  <div className="text-green-800 font-semibold">
                    Total Value: ₹{(parseFloat(newListing.quantity) * parseFloat(newListing.pricePerUnit)).toLocaleString()}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Condition
                </label>
                <select
                  value={newListing.condition}
                  onChange={(e) => setNewListing(prev => ({ ...prev, condition: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                >
                  {conditions.map(condition => (
                    <option key={condition} value={condition}>{condition}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newListing.description}
                  onChange={(e) => setNewListing(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  placeholder="Describe your product, storage conditions, quality, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trade Conditions *
                </label>
                <textarea
                  value={newListing.tradeConditions}
                  onChange={(e) => setNewListing(prev => ({ ...prev, tradeConditions: e.target.value }))}
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  placeholder="What are you looking to trade for? e.g., Looking for vegetables, spices, or dairy products of equivalent value"
                />
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
                className="px-6 py-3 bg-gradient-to-r from-orange-600 to-purple-600 text-white font-semibold rounded-xl hover:from-orange-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Create Listing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Trade Proposal Modal */}
      {showTradeModal && selectedItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Propose Trade</h2>
                <button
                  onClick={() => setShowTradeModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Requested Item */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Requested Item</h3>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <img
                      src={selectedItem.images[0]}
                      alt={selectedItem.productName}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{selectedItem.productName}</h4>
                      <p className="text-sm text-gray-600">
                        {selectedItem.quantity} {selectedItem.unit} • ₹{selectedItem.pricePerUnit} per {selectedItem.unit}
                      </p>
                      <p className="text-lg font-bold text-purple-600">
                        Total Value: ₹{selectedItem.totalValue.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Select Items to Offer */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Select Items to Offer in Trade
                  <span className="text-sm font-normal text-red-600 ml-2">
                    (Required: Select items worth at least 80% of requested value)
                  </span>
                </h3>
                
                {myListings.length === 0 ? (
                  <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                      <span className="text-yellow-800">
                        You need to create listings first before you can propose trades.
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {myListings.map((item) => (
                      <div
                        key={item.id}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                          selectedOfferItems.find(i => i.id === item.id)
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => toggleOfferItem(item)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                            selectedOfferItems.find(i => i.id === item.id)
                              ? 'border-green-500 bg-green-500'
                              : 'border-gray-300'
                          }`}>
                            {selectedOfferItems.find(i => i.id === item.id) && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <img
                            src={item.images[0]}
                            alt={item.productName}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{item.productName}</h4>
                            <p className="text-sm text-gray-600">
                              {item.quantity} {item.unit} • ₹{item.totalValue.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Trade Summary */}
              {selectedOfferItems.length > 0 && (
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Trade Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-800">Requested Value:</span>
                      <span className="font-semibold text-blue-900">₹{selectedItem.totalValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-800">Offered Value:</span>
                      <span className="font-semibold text-blue-900">
                        ₹{selectedOfferItems.reduce((sum, item) => sum + item.totalValue, 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-blue-200 pt-2">
                      <span className="text-blue-800 font-medium">Value Ratio:</span>
                      <span className={`font-bold ${
                        (selectedOfferItems.reduce((sum, item) => sum + item.totalValue, 0) / selectedItem.totalValue) >= 0.8
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}>
                        {((selectedOfferItems.reduce((sum, item) => sum + item.totalValue, 0) / selectedItem.totalValue) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message (Optional)
                </label>
                <textarea
                  value={tradeMessage}
                  onChange={(e) => setTradeMessage(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  placeholder="Add a message to explain your trade proposal..."
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
              <button
                onClick={() => setShowTradeModal(false)}
                className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleTradeProposal}
                disabled={selectedOfferItems.length === 0 || (selectedOfferItems.reduce((sum, item) => sum + item.totalValue, 0) / selectedItem.totalValue) < 0.8}
                className="px-6 py-3 bg-gradient-to-r from-orange-600 to-purple-600 text-white font-semibold rounded-xl hover:from-orange-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                Send Proposal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}