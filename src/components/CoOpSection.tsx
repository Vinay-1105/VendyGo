import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, Calculator, Package, Plus, Minus, ShoppingCart, Clock, MapPin, Star, CheckCircle, AlertCircle } from 'lucide-react';
import type { User } from '../App';

interface CoOpSectionProps {
  user: User;
}

interface CoOpProduct {
  id: string;
  name: string;
  category: string;
  wholesalePrice: number;
  retailPrice: number;
  unit: string;
  minimumOrder: number;
  currentCommitted: number;
  maxCapacity: number;
  wholesalerName: string;
  wholesalerRating: number;
  wholesalerLocation: string;
  description: string;
  image: string;
  deadline: string;
  participants: Array<{
    vendorName: string;
    quantity: number;
    contribution: number;
  }>;
  savings: number;
}

interface UserContribution {
  productId: string;
  quantity: number;
  contribution: number;
}

export function CoOpSection({ user }: CoOpSectionProps) {
  const [activeTab, setActiveTab] = useState('browse');
  const [userContributions, setUserContributions] = useState<UserContribution[]>([]);
  const [selectedQuantities, setSelectedQuantities] = useState<Record<string, number>>({});

  // Mock Co-Op products data
  const [coOpProducts, setCoOpProducts] = useState<CoOpProduct[]>([
    {
      id: '1',
      name: 'Premium Basmati Rice',
      category: 'Grains',
      wholesalePrice: 85,
      retailPrice: 140,
      unit: 'kg',
      minimumOrder: 500,
      currentCommitted: 320,
      maxCapacity: 1000,
      wholesalerName: 'Rice Mills Direct',
      wholesalerRating: 4.8,
      wholesalerLocation: 'Delhi NCR',
      description: 'Premium aged basmati rice directly from mills. Perfect for restaurants and food businesses.',
      image: 'https://flourworks.in/wp-content/uploads/2023/06/1-12.jpeg?auto=compress&cs=tinysrgb&w=800',
      deadline: '2025-01-25T10:00:00Z',
      participants: [
        { vendorName: 'Spice Garden Restaurant', quantity: 100, contribution: 8500 },
        { vendorName: 'Food Corner Delhi', quantity: 75, contribution: 6375 },
        { vendorName: 'Fresh Mart Gurgaon', quantity: 145, contribution: 12325 }
      ],
      savings: 39.3
    },
    {
      id: '2',
      name: 'Organic Mixed Vegetables',
      category: 'Vegetables',
      wholesalePrice: 65,
      retailPrice: 120,
      unit: 'kg',
      minimumOrder: 200,
      currentCommitted: 150,
      maxCapacity: 400,
      wholesalerName: 'Green Valley Farms',
      wholesalerRating: 4.9,
      wholesalerLocation: 'Mumbai',
      description: 'Fresh organic vegetables including tomatoes, onions, bell peppers, and leafy greens.',
      image: 'https://yummieliciouz.com/wp-content/uploads/2024/04/mixed-vegetables-1024x683.png',
      deadline: '2025-01-22T15:00:00Z',
      participants: [
        { vendorName: 'Healthy Eats Cafe', quantity: 50, contribution: 3250 },
        { vendorName: 'Garden Fresh Store', quantity: 100, contribution: 6500 }
      ],
      savings: 45.8
    },
    {
      id: '3',
      name: 'Premium Cooking Oil',
      category: 'Oils',
      wholesalePrice: 110,
      retailPrice: 180,
      unit: 'liters',
      minimumOrder: 100,
      currentCommitted: 85,
      maxCapacity: 200,
      wholesalerName: 'Golden Oil Company',
      wholesalerRating: 4.7,
      wholesalerLocation: 'Bangalore',
      description: 'High-quality cooking oil in 5L containers. Perfect for restaurants and catering services.',
      image: 'https://www.zydushealthcare.com/wp-content/uploads/2021/05/cooking-oil1.jpg',
      deadline: '2025-01-28T12:00:00Z',
      participants: [
        { vendorName: 'Quick Bites Restaurant', quantity: 40, contribution: 4400 },
        { vendorName: 'Family Kitchen', quantity: 45, contribution: 4950 }
      ],
      savings: 38.9
    },
    {
      id: '4',
      name: 'Pure Desi Ghee',
      category: 'Dairy',
      wholesalePrice: 450,
      retailPrice: 650,
      unit: 'kg',
      minimumOrder: 150,
      currentCommitted: 95,
      maxCapacity: 300,
      wholesalerName: 'Rajasthani Dairy Farm',
      wholesalerRating: 4.9,
      wholesalerLocation: 'Jaipur',
      description: 'Pure desi cow ghee prepared using traditional methods. 100% natural and healthy.',
      image: 'https://admcart.com/wp-content/uploads/2024/11/412hqmi5L._AC_UF10001000_QL80_.jpg',
      deadline: '2025-01-30T14:00:00Z',
      participants: [
        { vendorName: 'Rajasthani Sweets', quantity: 25, contribution: 11250 },
        { vendorName: 'Traditional Foods', quantity: 30, contribution: 13500 }
      ],
      savings: 30.8
    },
    {
      id: '5',
      name: 'Kerala Spices Mix',
      category: 'Spices',
      wholesalePrice: 280,
      retailPrice: 420,
      unit: 'kg',
      minimumOrder: 300,
      currentCommitted: 180,
      maxCapacity: 500,
      wholesalerName: 'Kerala Spice Board',
      wholesalerRating: 4.8,
      wholesalerLocation: 'Kochi',
      description: 'Authentic spices from Kerala - black pepper, cardamom, cinnamon, and other aromatic spices.',
      image: 'https://images.pexels.com/photos/277253/pexels-photo-277253.jpeg?auto=compress&cs=tinysrgb&w=800',
      deadline: '2025-02-02T16:00:00Z',
      participants: [
        { vendorName: 'Spice King Kochi', quantity: 45, contribution: 12600 },
        { vendorName: 'Masala Market', quantity: 38, contribution: 10640 }
      ],
      savings: 33.3
    },
    {
      id: '6',
      name: 'Premium Pulses Mix',
      category: 'Pulses',
      wholesalePrice: 95,
      retailPrice: 145,
      unit: 'kg',
      minimumOrder: 400,
      currentCommitted: 250,
      maxCapacity: 600,
      wholesalerName: 'MP Agriculture Board',
      wholesalerRating: 4.7,
      wholesalerLocation: 'Indore',
      description: 'High-quality pulses from Madhya Pradesh - toor, chana, masoor, urad, and moong dal.',
      image: 'https://www.agroexporters.net/uploaded-files/thumb-cache/member_127/thumb---pulses4906.jpg',
      deadline: '2025-01-26T11:00:00Z',
      participants: [
        { vendorName: 'Dal Bhandar Indore', quantity: 55, contribution: 5225 },
        { vendorName: 'Grain Market', quantity: 48, contribution: 4560 }
      ],
      savings: 34.5
    },
    {
      id: '7',
      name: 'Fresh Seasonal Fruits',
      category: 'Fruits',
      wholesalePrice: 55,
      retailPrice: 85,
      unit: 'kg',
      minimumOrder: 250,
      currentCommitted: 165,
      maxCapacity: 400,
      wholesalerName: 'Maharashtra Fruit Association',
      wholesalerRating: 4.6,
      wholesalerLocation: 'Nashik',
      description: 'Fresh seasonal fruits from Maharashtra - grapes, oranges, bananas, apples, and pomegranates.',
      image: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=800',
      deadline: '2025-01-24T09:00:00Z',
      participants: [
        { vendorName: 'Fresh Fruits Nashik', quantity: 42, contribution: 2310 },
        { vendorName: 'Fruit Bazaar', quantity: 38, contribution: 2090 }
      ],
      savings: 35.3
    },
    {
      id: '8',
      name: 'Premium Dairy Products',
      category: 'Dairy',
      wholesalePrice: 35,
      retailPrice: 55,
      unit: 'liters',
      minimumOrder: 200,
      currentCommitted: 125,
      maxCapacity: 350,
      wholesalerName: 'Amul Dairy Cooperative',
      wholesalerRating: 4.9,
      wholesalerLocation: 'Anand',
      description: 'Fresh dairy products from Gujarat - milk, curd, paneer, butter, and other dairy items.',
      image: 'https://t4.ftcdn.net/jpg/01/45/60/21/360_F_145602173_05uVexifBuCvWIKvsHGWNuIpPtp5ShkI.jpg',
      deadline: '2025-01-27T13:00:00Z',
      participants: [
        { vendorName: 'Dairy Fresh Anand', quantity: 28, contribution: 980 },
        { vendorName: 'Pure Milk', quantity: 32, contribution: 1120 }
      ],
      savings: 36.4
    },
    {
      id: '9',
      name: 'Organic Wheat Flour',
      category: 'Grains',
      wholesalePrice: 45,
      retailPrice: 70,
      unit: 'kg',
      minimumOrder: 300,
      currentCommitted: 180,
      maxCapacity: 500,
      wholesalerName: 'Punjab Grain Mills',
      wholesalerRating: 4.7,
      wholesalerLocation: 'Ludhiana',
      description: 'Stone-ground organic wheat flour from Punjab. Perfect for bakeries and restaurants.',
      image: 'https://images.jdmagicbox.com/quickquotes/images_main/organic-wheat-flour-3te-1kg-2022114078-5m48giir.jpg',
      deadline: '2025-02-05T10:00:00Z',
      participants: [
        { vendorName: 'Bakery Fresh', quantity: 60, contribution: 2700 },
        { vendorName: 'Roti House', quantity: 45, contribution: 2025 }
      ],
      savings: 35.7
    },
    {
      id: '10',
      name: 'Fresh Green Chilies',
      category: 'Vegetables',
      wholesalePrice: 80,
      retailPrice: 120,
      unit: 'kg',
      minimumOrder: 100,
      currentCommitted: 65,
      maxCapacity: 200,
      wholesalerName: 'Andhra Spice Farms',
      wholesalerRating: 4.8,
      wholesalerLocation: 'Guntur',
      description: 'Fresh green chilies from Andhra Pradesh. High quality and perfect spice level.',
      image: 'https://www.greendna.in/cdn/shop/products/green_chilli.jpg?v=1562414368',
      deadline: '2025-01-29T14:00:00Z',
      participants: [
        { vendorName: 'Spicy Kitchen', quantity: 25, contribution: 2000 },
        { vendorName: 'Hot Bites', quantity: 20, contribution: 1600 }
      ],
      savings: 33.3
    },
    {
      id: '11',
      name: 'Premium Cashew Nuts',
      category: 'Nuts',
      wholesalePrice: 650,
      retailPrice: 900,
      unit: 'kg',
      minimumOrder: 50,
      currentCommitted: 35,
      maxCapacity: 100,
      wholesalerName: 'Kerala Cashew Board',
      wholesalerRating: 4.9,
      wholesalerLocation: 'Kollam',
      description: 'Premium quality cashew nuts from Kerala. Perfect for sweets and snacks.',
      image: 'https://m.media-amazon.com/images/I/51B5UnfSFSL._UF350,350_QL80_.jpg',
      deadline: '2025-02-10T12:00:00Z',
      participants: [
        { vendorName: 'Sweet Palace', quantity: 15, contribution: 9750 },
        { vendorName: 'Dry Fruits Store', quantity: 20, contribution: 13000 }
      ],
      savings: 27.8
    },
    {
      id: '12',
      name: 'Coconut Oil',
      category: 'Oils',
      wholesalePrice: 180,
      retailPrice: 250,
      unit: 'liters',
      minimumOrder: 80,
      currentCommitted: 55,
      maxCapacity: 150,
      wholesalerName: 'Tamil Nadu Coconut Board',
      wholesalerRating: 4.6,
      wholesalerLocation: 'Coimbatore',
      description: 'Pure coconut oil extracted using traditional methods. Great for cooking and health.',
      image: 'https://cdn.shopify.com/s/files/1/0296/7109/6453/files/benefits_of_coconut_oil.jpg?v=1692182810',
      deadline: '2025-02-08T15:30:00Z',
      participants: [
        { vendorName: 'South Indian Kitchen', quantity: 25, contribution: 4500 },
        { vendorName: 'Health Foods', quantity: 30, contribution: 5400 }
      ],
      savings: 28.0
    },
    {
      id: '13',
      name: 'Organic Jaggery',
      category: 'Sweeteners',
      wholesalePrice: 120,
      retailPrice: 180,
      unit: 'kg',
      minimumOrder: 200,
      currentCommitted: 140,
      maxCapacity: 300,
      wholesalerName: 'Maharashtra Sugar Mills',
      wholesalerRating: 4.7,
      wholesalerLocation: 'Pune',
      description: 'Organic jaggery made from sugarcane. Natural sweetener perfect for traditional sweets.',
      image: 'https://www.greendna.in/cdn/shop/files/IMG_9609.jpg?v=1684468916',
      deadline: '2025-02-12T11:00:00Z',
      participants: [
        { vendorName: 'Traditional Sweets', quantity: 50, contribution: 6000 },
        { vendorName: 'Organic Store', quantity: 40, contribution: 4800 }
      ],
      savings: 33.3
    },
    {
      id: '14',
      name: 'Fresh Ginger',
      category: 'Vegetables',
      wholesalePrice: 90,
      retailPrice: 140,
      unit: 'kg',
      minimumOrder: 150,
      currentCommitted: 95,
      maxCapacity: 250,
      wholesalerName: 'Himachal Ginger Farms',
      wholesalerRating: 4.8,
      wholesalerLocation: 'Shimla',
      description: 'Fresh ginger from Himachal Pradesh. High quality with strong aroma and flavor.',
      image: 'https://images.pexels.com/photos/161556/ginger-plant-asia-rhizome-161556.jpeg?auto=compress&cs=tinysrgb&w=800',
      deadline: '2025-02-06T16:00:00Z',
      participants: [
        { vendorName: 'Spice Corner', quantity: 35, contribution: 3150 },
        { vendorName: 'Fresh Market', quantity: 30, contribution: 2700 }
      ],
      savings: 35.7
    },
    {
      id: '15',
      name: 'Premium Tea Leaves',
      category: 'Beverages',
      wholesalePrice: 350,
      retailPrice: 500,
      unit: 'kg',
      minimumOrder: 100,
      currentCommitted: 70,
      maxCapacity: 200,
      wholesalerName: 'Darjeeling Tea Gardens',
      wholesalerRating: 4.9,
      wholesalerLocation: 'Darjeeling',
      description: 'Premium Darjeeling tea leaves. Perfect for cafes and restaurants.',
      image: 'https://teacultureoftheworld.com/cdn/shop/articles/tea-leaves-collection-on-wooden-board-2022-01-18-23-42-23-utc.jpg?v=1697529827&width=600',
      deadline: '2025-02-15T10:30:00Z',
      participants: [
        { vendorName: 'Tea House', quantity: 25, contribution: 8750 },
        { vendorName: 'Cafe Central', quantity: 20, contribution: 7000 }
      ],
      savings: 30.0
    },
    {
      id: '16',
      name: 'Organic Honey',
      category: 'Sweeteners',
      wholesalePrice: 280,
      retailPrice: 400,
      unit: 'kg',
      minimumOrder: 80,
      currentCommitted: 50,
      maxCapacity: 150,
      wholesalerName: 'Himalayan Bee Farms',
      wholesalerRating: 4.8,
      wholesalerLocation: 'Manali',
      description: 'Pure organic honey from Himalayan region. Natural and unprocessed.',
      image: 'https://img1.exportersindia.com/product_images/bc-full/2021/4/8685561/organic-honey-1617784678-5781251.jpeg',
      deadline: '2025-02-18T14:00:00Z',
      participants: [
        { vendorName: 'Health Store', quantity: 20, contribution: 5600 },
        { vendorName: 'Natural Foods', quantity: 15, contribution: 4200 }
      ],
      savings: 30.0
    },
    {
      id: '17',
      name: 'Fresh Mint Leaves',
      category: 'Herbs',
      wholesalePrice: 150,
      retailPrice: 220,
      unit: 'kg',
      minimumOrder: 50,
      currentCommitted: 30,
      maxCapacity: 100,
      wholesalerName: 'Herb Gardens Delhi',
      wholesalerRating: 4.7,
      wholesalerLocation: 'Delhi NCR',
      description: 'Fresh mint leaves grown organically. Perfect for restaurants and beverage shops.',
      image: 'https://ranibrand.com/cdn/shop/files/81cVMdZyScL_1200x864.jpg?v=1716960054',
      deadline: '2025-01-31T12:00:00Z',
      participants: [
        { vendorName: 'Juice Bar', quantity: 12, contribution: 1800 },
        { vendorName: 'Restaurant Fresh', quantity: 18, contribution: 2700 }
      ],
      savings: 31.8
    },
    {
      id: '18',
      name: 'Premium Almonds',
      category: 'Nuts',
      wholesalePrice: 550,
      retailPrice: 750,
      unit: 'kg',
      minimumOrder: 60,
      currentCommitted: 40,
      maxCapacity: 120,
      wholesalerName: 'Kashmir Almond Board',
      wholesalerRating: 4.9,
      wholesalerLocation: 'Srinagar',
      description: 'Premium Kashmiri almonds. High quality and perfect for sweets and snacks.',
      image: 'https://www.inayva.com/cdn/shop/files/premiumalmondsonline.png?v=1729753735',
      deadline: '2025-02-20T11:30:00Z',
      participants: [
        { vendorName: 'Dry Fruits Palace', quantity: 20, contribution: 11000 },
        { vendorName: 'Sweet Shop', quantity: 20, contribution: 11000 }
      ],
      savings: 26.7
    },
    {
      id: '19',
      name: 'Fresh Coriander Leaves',
      category: 'Herbs',
      wholesalePrice: 80,
      retailPrice: 120,
      unit: 'kg',
      minimumOrder: 100,
      currentCommitted: 65,
      maxCapacity: 200,
      wholesalerName: 'Green Herbs Farm',
      wholesalerRating: 4.6,
      wholesalerLocation: 'Pune',
      description: 'Fresh coriander leaves grown organically. Essential for Indian cooking.',
      image: 'https://www.foodandwine.com/thmb/kjn7ULvJuySVzZTsLFToPEe-KHM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Coriander-vs-cilantro-FT-BLOG0624-cc8f8172b07b49e7ad435157a846dc16.jpg',
      deadline: '2025-02-03T15:00:00Z',
      participants: [
        { vendorName: 'Indian Kitchen', quantity: 25, contribution: 2000 },
        { vendorName: 'Spice Market', quantity: 20, contribution: 1600 }
      ],
      savings: 33.3
    },
    {
      id: '20',
      name: 'Organic Brown Rice',
      category: 'Grains',
      wholesalePrice: 95,
      retailPrice: 140,
      unit: 'kg',
      minimumOrder: 250,
      currentCommitted: 160,
      maxCapacity: 400,
      wholesalerName: 'Organic Rice Mills',
      wholesalerRating: 4.8,
      wholesalerLocation: 'Chennai',
      description: 'Organic brown rice with high nutritional value. Perfect for health-conscious customers.',
      image: 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&w=800',
      deadline: '2025-02-25T13:00:00Z',
      participants: [
        { vendorName: 'Health Food Store', quantity: 50, contribution: 4750 },
        { vendorName: 'Organic Market', quantity: 45, contribution: 4275 }
      ],
      savings: 32.1
    }
  ]);

  // Auto-refresh co-op status every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCoOpProducts(prevProducts => 
        prevProducts.map(product => ({
          ...product,
          currentCommitted: Math.min(product.currentCommitted + Math.floor(Math.random() * 10), product.maxCapacity)
        }))
      );
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const calculateProgress = (product: CoOpProduct) => {
    return Math.min((product.currentCommitted / product.minimumOrder) * 100, 100);
  };

  const calculateUserSavings = (product: CoOpProduct, quantity: number) => {
    const wholesaleCost = quantity * product.wholesalePrice;
    const retailCost = quantity * product.retailPrice;
    return retailCost - wholesaleCost;
  };

  const isDeadlineSoon = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    const hoursLeft = (deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    return hoursLeft <= 24;
  };

  const handleQuantityChange = (productId: string, change: number) => {
    setSelectedQuantities(prev => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) + change)
    }));
  };

  const handleJoinCoOp = (product: CoOpProduct) => {
    const quantity = selectedQuantities[product.id] || 0;
    if (quantity <= 0) {
      alert('Please select a quantity greater than 0');
      return;
    }

    const contribution = quantity * product.wholesalePrice;
    const newContribution: UserContribution = {
      productId: product.id,
      quantity,
      contribution
    };

    // Update user contributions
    setUserContributions(prev => {
      const existing = prev.find(c => c.productId === product.id);
      if (existing) {
        return prev.map(c => 
          c.productId === product.id 
            ? { ...c, quantity: c.quantity + quantity, contribution: c.contribution + contribution }
            : c
        );
      } else {
        return [...prev, newContribution];
      }
    });

    // Update product committed quantity
    setCoOpProducts(prev => 
      prev.map(p => 
        p.id === product.id 
          ? {
              ...p,
              currentCommitted: p.currentCommitted + quantity,
              participants: [
                ...p.participants,
                {
                  vendorName: user.businessName,
                  quantity,
                  contribution
                }
              ]
            }
          : p
      )
    );

    // Reset selected quantity
    setSelectedQuantities(prev => ({ ...prev, [product.id]: 0 }));
    
    alert(`Successfully joined the co-op! You've committed ${quantity} ${product.unit} for ₹${contribution.toLocaleString()}`);
  };

  const getTotalContributions = () => {
    return userContributions.reduce((sum, contrib) => sum + contrib.contribution, 0);
  };

  const getTotalSavings = () => {
    return userContributions.reduce((sum, contrib) => {
      const product = coOpProducts.find(p => p.id === contrib.productId);
      if (product) {
        return sum + calculateUserSavings(product, contrib.quantity);
      }
      return sum;
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-pink-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-poppins animate-fade-in-up">
            Co-Op Marketplace
          </h1>
          <p className="text-xl text-gray-600 animate-fade-in-up delay-200">
            Join cooperative buying groups to access wholesale prices and bulk discounts
          </p>
        </div>

        {/* User Stats */}
        {userContributions.length > 0 && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl shadow-lg border border-green-200 mb-8 animate-fade-in-up">
            <h2 className="text-xl font-bold text-green-900 mb-4">Your Co-Op Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">{userContributions.length}</div>
                <div className="text-sm text-green-800">Active Co-Ops</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">₹{getTotalContributions().toLocaleString()}</div>
                <div className="text-sm text-green-800">Total Committed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">₹{getTotalSavings().toLocaleString()}</div>
                <div className="text-sm text-green-800">Total Savings</div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
          {[
            { id: 'browse', label: 'Browse Co-Ops', icon: Package },
            { id: 'my-coops', label: 'My Co-Ops', icon: Users },
            { id: 'calculator', label: 'Savings Calculator', icon: Calculator }
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

        {/* Browse Co-Ops Tab */}
        {activeTab === 'browse' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {coOpProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up">
                  {/* Product Header */}
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700">
                      {product.category}
                    </div>
                    {isDeadlineSoon(product.deadline) && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white rounded-full text-sm font-bold animate-pulse">
                        ENDING SOON
                      </div>
                    )}
                  </div>

                  {/* Product Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{product.name}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{product.wholesalerLocation}</span>
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span>{product.wholesalerRating}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-purple-600">₹{product.wholesalePrice}</div>
                        <div className="text-sm text-gray-500 line-through">₹{product.retailPrice}</div>
                        <div className="text-xs text-green-600 font-medium">{product.savings.toFixed(1)}% OFF</div>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4">{product.description}</p>

                    {/* Progress Bar */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                        <span className="text-sm text-gray-600">
                          {product.currentCommitted}/{product.minimumOrder} {product.unit}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-orange-500 to-purple-500 h-3 rounded-full transition-all duration-1000 animate-pulse"
                          style={{ width: `${calculateProgress(product)}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {calculateProgress(product).toFixed(1)}% Complete • 
                        {product.maxCapacity - product.currentCommitted} {product.unit} remaining
                      </div>
                    </div>

                    {/* Deadline */}
                    <div className="flex items-center space-x-2 mb-4 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>Ends: {new Date(product.deadline).toLocaleDateString('en-IN', { 
                        day: 'numeric', 
                        month: 'short', 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}</span>
                    </div>

                    {/* Quantity Selection */}
                    <div className="bg-gray-50 p-4 rounded-xl mb-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium text-gray-900">Select Quantity ({product.unit})</span>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handleQuantityChange(product.id, -1)}
                            className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors duration-200"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center font-semibold">
                            {selectedQuantities[product.id] || 0}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(product.id, 1)}
                            className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors duration-200"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {selectedQuantities[product.id] > 0 && (
                        <div className="space-y-2 text-sm animate-fade-in-up">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Cost:</span>
                            <span className="font-semibold">
                              ₹{((selectedQuantities[product.id] || 0) * product.wholesalePrice).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">You Save:</span>
                            <span className="font-bold text-green-600">
                              ₹{calculateUserSavings(product, selectedQuantities[product.id] || 0).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Join Button */}
                    <button
                      onClick={() => handleJoinCoOp(product)}
                      disabled={!selectedQuantities[product.id] || selectedQuantities[product.id] <= 0}
                      className="w-full px-6 py-3 bg-gradient-to-r from-orange-600 to-purple-600 text-white font-semibold rounded-xl hover:from-orange-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:transform-none"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Join Co-Op</span>
                    </button>

                    {/* Participants Preview */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="text-sm font-medium text-gray-900 mb-2">
                        Recent Participants ({product.participants.length})
                      </div>
                      <div className="space-y-1">
                        {product.participants.slice(0, 3).map((participant, index) => (
                          <div key={index} className="flex justify-between items-center text-xs text-gray-600">
                            <span>{participant.vendorName}</span>
                            <span>{participant.quantity} {product.unit}</span>
                          </div>
                        ))}
                        {product.participants.length > 3 && (
                          <div className="text-xs text-gray-500 text-center">
                            +{product.participants.length - 3} more participants
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* My Co-Ops Tab */}
        {activeTab === 'my-coops' && (
          <div className="space-y-8">
            {userContributions.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl shadow-xl border border-gray-200 text-center">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Co-Op Participations Yet</h3>
                <p className="text-gray-600 mb-6">
                  Join cooperative buying groups to access wholesale prices and bulk discounts.
                </p>
                <button
                  onClick={() => setActiveTab('browse')}
                  onClick={() => setActiveTab('browse')}
                  className="px-6 py-3 bg-gradient-to-r from-orange-600 to-purple-600 text-white font-semibold rounded-xl hover:from-orange-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Browse Co-Ops
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userContributions.map((contribution) => {
                  const product = coOpProducts.find(p => p.id === contribution.productId);
                  if (!product) return null;

                  return (
                    <div key={contribution.productId} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 mb-2">{product.name}</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Your Quantity:</span>
                            <span className="font-semibold">{contribution.quantity} {product.unit}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Your Contribution:</span>
                            <span className="font-semibold">₹{contribution.contribution.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Your Savings:</span>
                            <span className="font-bold text-green-600">
                              ₹{calculateUserSavings(product, contribution.quantity).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Status:</span>
                            <span className={`font-medium ${
                              product.currentCommitted >= product.minimumOrder 
                                ? 'text-green-600' 
                                : 'text-orange-600'
                            }`}>
                              {product.currentCommitted >= product.minimumOrder ? 'Ready' : 'In Progress'}
                            </span>
                          </div>
                        </div>

                        {product.currentCommitted >= product.minimumOrder && (
                          <div className="mt-3 p-2 bg-green-50 rounded-lg flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-green-800 font-medium">
                              Minimum reached! Order will be processed soon.
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Savings Calculator Tab */}
        {activeTab === 'calculator' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200">
              <div className="text-center mb-8">
                <Calculator className="w-16 h-16 text-orange-600 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Co-Op Savings Calculator</h2>
                <p className="text-gray-600">Calculate potential savings from joining cooperative buying groups</p>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Category
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200">
                      <option>Grains & Rice</option>
                      <option>Vegetables</option>
                      <option>Spices</option>
                      <option>Dairy Products</option>
                      <option>Cooking Oils</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Requirement
                    </label>
                    <input
                      type="number"
                      placeholder="100"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Retail Price (₹ per unit)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="140.00"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Co-Op Wholesale Price (₹ per unit)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="85.00"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Sample Calculation Results */}
                <div className="bg-gradient-to-br from-orange-50 to-purple-50 p-6 rounded-2xl border border-orange-200">
                  <h3 className="font-bold text-orange-900 mb-4 text-lg">Savings Breakdown</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-orange-800 font-medium">Monthly Retail Cost:</span>
                      <span className="font-bold text-orange-900 text-lg">₹14,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-orange-800 font-medium">Monthly Co-Op Cost:</span>
                      <span className="font-bold text-orange-900 text-lg">₹8,500</span>
                    </div>
                    <div className="border-t border-orange-200 pt-3 flex justify-between items-center">
                      <span className="font-bold text-orange-900 text-lg">Monthly Savings:</span>
                      <div className="text-right">
                        <div className="font-bold text-green-600 text-2xl">₹5,500</div>
                        <div className="text-sm text-green-600 font-medium">(39.3% savings)</div>
                      </div>
                    </div>
                    <div className="border-t border-orange-200 pt-3 flex justify-between items-center">
                      <span className="font-bold text-orange-900 text-lg">Annual Savings:</span>
                      <div className="font-bold text-green-600 text-2xl">₹66,000</div>
                    </div>
                  </div>
                </div>

                <button className="w-full px-8 py-4 bg-gradient-to-r from-orange-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-orange-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                  <TrendingUp className="w-5 h-5" />
                  <span>Find Similar Co-Ops</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}