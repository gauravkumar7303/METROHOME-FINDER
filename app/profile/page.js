'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  FaUser, FaHome, FaHeart, FaEnvelope, FaCog, 
  FaPlusCircle, FaStar, FaEye, FaPhone, FaMapMarkerAlt,
  FaCalendarAlt, FaCheckCircle, FaSignOutAlt
} from 'react-icons/fa'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('dashboard')

  // Mock user data
  const user = {
    name: 'Rahul Sharma',
    email: 'rahul.sharma@email.com',
    phone: '+91 98765 43210',
    location: 'West Delhi',
    memberSince: '2023',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    stats: {
      propertiesListed: 8,
      propertiesSold: 3,
      totalViews: 15420,
      avgRating: 4.8
    }
  }

  // Mock recent activities
  const recentActivities = [
    { id: 1, action: 'New inquiry on 2 BHK Flat', time: '2 hours ago', icon: FaEnvelope },
    { id: 2, action: 'Property viewed by 45 people', time: '5 hours ago', icon: FaEye },
    { id: 3, action: 'New saved search alert', time: '1 day ago', icon: FaStar },
    { id: 4, action: 'Property "Green Park Residence" got verified', time: '2 days ago', icon: FaCheckCircle }
  ]

  // Mock properties
  const recentProperties = [
    {
      id: 1,
      title: '2 BHK Flat in Rajouri Garden',
      price: '₹45,000/month',
      views: 234,
      inquiries: 12,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      title: '3 BHK Villa in Gurugram',
      price: '₹85,000/month',
      views: 567,
      inquiries: 23,
      status: 'pending',
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ]

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FaUser },
    { id: 'my-properties', label: 'My Properties', icon: FaHome },
    { id: 'saved-properties', label: 'Saved Properties', icon: FaHeart },
    { id: 'inquiries', label: 'Inquiries', icon: FaEnvelope },
    { id: 'settings', label: 'Settings', icon: FaCog },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container-custom py-8">
        
        {/* Profile Header with Cover Image */}
        <div className="relative h-64 rounded-3xl overflow-hidden mb-8 group">
          {/* Cover Image */}
          <img
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Cover"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
          
          {/* Profile Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="flex items-end gap-6">
              {/* Avatar */}
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-2xl border-4 border-white object-cover"
                />
                {user.verified && (
                  <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
                    <FaCheckCircle className="text-white text-sm" />
                  </div>
                )}
              </div>
              
              {/* User Info */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                <div className="flex items-center gap-4 text-sm text-white/90">
                  <span className="flex items-center gap-1">
                    <FaEnvelope /> {user.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaPhone /> {user.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaMapMarkerAlt /> {user.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt /> Member since {user.memberSince}
                  </span>
                </div>
              </div>

              {/* Edit Profile Button */}
              <Link
                href="/profile/settings"
                className="bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-xl hover:bg-white/30 transition-all duration-300"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Menu */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-4 sticky top-24">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all duration-300 ${
                    activeTab === item.id
                      ? 'bg-green-600 text-white'
                      : 'text-gray-700 hover:bg-green-50 hover:text-green-600'
                  }`}
                >
                  <item.icon className="text-lg" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}

              {/* Logout Button */}
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-300 mt-4">
                <FaSignOutAlt className="text-lg" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <FaHome className="text-3xl text-green-600 mb-3" />
                <div className="text-2xl font-bold text-gray-900">{user.stats.propertiesListed}</div>
                <div className="text-sm text-gray-600">Properties Listed</div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <FaHeart className="text-3xl text-red-500 mb-3" />
                <div className="text-2xl font-bold text-gray-900">{user.stats.propertiesSold}</div>
                <div className="text-sm text-gray-600">Properties Sold</div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <FaEye className="text-3xl text-blue-500 mb-3" />
                <div className="text-2xl font-bold text-gray-900">{user.stats.totalViews.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Views</div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <FaStar className="text-3xl text-yellow-500 mb-3" />
                <div className="text-2xl font-bold text-gray-900">{user.stats.avgRating}</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link
                  href="/profile/add-property"
                  className="flex flex-col items-center p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-all duration-300 group"
                >
                  <FaPlusCircle className="text-3xl text-green-600 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-gray-900">Add Property</span>
                </Link>
                
                <Link
                  href="/profile/my-properties"
                  className="flex flex-col items-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all duration-300 group"
                >
                  <FaHome className="text-3xl text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-gray-900">My Properties</span>
                </Link>
                
                <Link
                  href="/profile/saved-properties"
                  className="flex flex-col items-center p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-all duration-300 group"
                >
                  <FaHeart className="text-3xl text-red-600 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-gray-900">Saved</span>
                </Link>
                
                <Link
                  href="/profile/inquiries"
                  className="flex flex-col items-center p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-all duration-300 group"
                >
                  <FaEnvelope className="text-3xl text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-gray-900">Inquiries</span>
                </Link>
              </div>
            </div>

            {/* Recent Properties */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Recent Properties</h2>
                <Link href="/profile/my-properties" className="text-green-600 hover:text-green-700 text-sm font-medium">
                  View All →
                </Link>
              </div>
              
              <div className="space-y-4">
                {recentProperties.map((property) => (
                  <div key={property.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:shadow-md transition-all duration-300">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{property.title}</h3>
                      <p className="text-green-600 font-bold mb-2">{property.price}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <FaEye /> {property.views} views
                        </span>
                        <span className="flex items-center gap-1">
                          <FaEnvelope /> {property.inquiries} inquiries
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          property.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {property.status === 'active' ? 'Active' : 'Pending Verification'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-all duration-300">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <activity.icon className="text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}