'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FaFilter, FaStar, FaMapMarkerAlt, FaTimes, FaHeart, FaShare, FaSearch, FaHome, FaBuilding, FaCity } from 'react-icons/fa'

export default function PropertiesPage() {
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    type: 'all',
    city: 'all',
    minPrice: '',
    maxPrice: '',
    bedrooms: 'any',
    furnishing: 'any'
  })
  const [likedProperties, setLikedProperties] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  // Sample properties data with Unsplash images
  const properties = [
    {
      id: 1,
      title: 'Moldova Borsașu',
      location: 'Rajouri Garden, West Delhi',
      price: '₹45,000/month',
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      type: 'Apartment',
      rating: 4.5,
      reviews: 128,
      beds: 2,
      baths: 1,
      area: 100,
      verified: true
    },
    {
      id: 2,
      title: 'Living Family Home',
      location: 'Sector 14, Gurugram',
      price: '₹65,000/month',
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      type: 'Villa',
      rating: 4.8,
      reviews: 256,
      beds: 3,
      baths: 2,
      area: 200,
      verified: true
    },
    {
      id: 3,
      title: 'Marina Villa Chiappini',
      location: 'Dwarka, West Delhi',
      price: '₹85,000/month',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      type: 'Luxury Villa',
      rating: 4.9,
      reviews: 342,
      beds: 4,
      baths: 3,
      area: 300,
      verified: true
    },
    {
      id: 4,
      title: 'Green Park Residence',
      location: 'Green Park, West Delhi',
      price: '₹38,000/month',
      image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      type: 'Apartment',
      rating: 4.3,
      reviews: 89,
      beds: 2,
      baths: 2,
      area: 150,
      verified: false
    },
    {
      id: 5,
      title: 'Cyber City Penthouse',
      location: 'Sector 29, Gurugram',
      price: '₹1,20,000/month',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      type: 'Penthouse',
      rating: 5.0,
      reviews: 67,
      beds: 3,
      baths: 3,
      area: 250,
      verified: true
    },
    {
      id: 6,
      title: 'Janakpuri Supertech',
      location: 'Janakpuri, West Delhi',
      price: '₹55,000/month',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      type: 'Apartment',
      rating: 4.6,
      reviews: 178,
      beds: 3,
      baths: 2,
      area: 180,
      verified: true
    },
    {
      id: 7,
      title: 'Sushant Lok Luxury',
      location: 'Sushant Lok, Gurugram',
      price: '₹75,000/month',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      type: 'Villa',
      rating: 4.7,
      reviews: 156,
      beds: 4,
      baths: 3,
      area: 280,
      verified: true
    },
    {
      id: 8,
      title: 'Paschimpuri Heights',
      location: 'Paschimpuri, West Delhi',
      price: '₹42,000/month',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      type: 'Apartment',
      rating: 4.4,
      reviews: 98,
      beds: 2,
      baths: 2,
      area: 140,
      verified: true
    },
    {
      id: 9,
      title: 'Golf Course Road Penthouse',
      location: 'Golf Course Road, Gurugram',
      price: '₹1,50,000/month',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      type: 'Penthouse',
      rating: 4.9,
      reviews: 203,
      beds: 4,
      baths: 4,
      area: 350,
      verified: true
    }
  ]

  const toggleLike = (id) => {
    if (likedProperties.includes(id)) {
      setLikedProperties(likedProperties.filter(propId => propId !== id))
    } else {
      setLikedProperties([...likedProperties, id])
    }
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  const handleReset = () => {
    setFilters({
      type: 'all',
      city: 'all',
      minPrice: '',
      maxPrice: '',
      bedrooms: 'any',
      furnishing: 'any'
    })
  }

  // Filter properties based on search and filters
  const filteredProperties = properties.filter(property => {
    // Search filter
    if (searchTerm && !property.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !property.location.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }
    
    // Type filter
    if (filters.type !== 'all' && property.type.toLowerCase() !== filters.type.toLowerCase()) {
      return false
    }
    
    // City filter
    if (filters.city !== 'all') {
      const cityMap = {
        'west_delhi': 'West Delhi',
        'gurugram': 'Gurugram'
      }
      if (!property.location.includes(cityMap[filters.city])) {
        return false
      }
    }
    
    // Price filter
    const priceNum = parseInt(property.price.replace(/[^0-9]/g, ''))
    if (filters.minPrice && priceNum < parseInt(filters.minPrice)) {
      return false
    }
    if (filters.maxPrice && priceNum > parseInt(filters.maxPrice)) {
      return false
    }
    
    // Bedrooms filter
    if (filters.bedrooms !== 'any') {
      if (filters.bedrooms === '4' && property.beds < 4) return false
      if (filters.bedrooms !== '4' && property.beds !== parseInt(filters.bedrooms)) return false
    }
    
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO SECTION WITH TRUST IMAGE */}
      <div className="relative h-[500px] overflow-hidden">
        {/* Background Image - Happy Family with Real Estate Agent */}
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105 hover:scale-100 transition-transform duration-10000"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-green-800/70"></div>
        </div>
        
        {/* Floating Elements for Trust */}
        {/* <div className="absolute top-20 left-20 animate-float">
          <div className="bg-white/20 backdrop-blur-md rounded-full p-4">
            <FaHome className="text-4xl text-white" />
          </div>
        </div> */}
        
        <div className="absolute bottom-20 right-20 animate-float-delayed">
          <div className="bg-white/20 backdrop-blur-md rounded-lg px-6 py-3">
            <div className="flex items-center gap-2">
              <FaStar className="text-yellow-400" />
              <span className="text-white font-bold">5000+ Verified Properties</span>
            </div>
          </div>
        </div>

        <div className="absolute top-40 right-40 animate-pulse">
          <div className="bg-green-500/30 backdrop-blur-md rounded-full px-4 py-2">
            <span className="text-white font-semibold">🔒 100% Genuine Listings</span>
          </div>
        </div>

        <div className="absolute bottom-50 right-60 animate-pulse">
          <div className="bg-blue-500/30 backdrop-blur-md rounded-full px-4 py-2">
            <span className="text-white font-semibold">🤝 Direct Owner Contact</span>
          </div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 container-custom h-full flex flex-col justify-center">
          <div className="max-w-3xl text-white">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm mb-4 animate-fade-in-up">
              <Link href="/" className="hover:text-green-300 transition">Home</Link>
              <span>/</span>
              <span className="text-green-300">Properties</span>
            </div>

            <h1 className="text-6xl font-bold mb-4 animate-fade-in-up transform hover:scale-105 transition-transform duration-300">
              Find Your Dream Home
            </h1>
            <p className="text-2xl mb-3 text-green-100 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              Discover 5000+ verified properties in Delhi & Gurugram
            </p>
            <p className="text-lg text-white/90 mb-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              🏆 India's Most Trusted Property Portal • ⭐ 4.8 Rating • ✅ Physically Verified
            </p>
            
            {/* Stats Row */}
            <div className="flex gap-8 mt-8 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <div className="text-center">
                <div className="text-3xl font-bold">5000+</div>
                <div className="text-sm text-green-200">Properties</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">10000+</div>
                <div className="text-sm text-green-200">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">100%</div>
                <div className="text-sm text-green-200">Verified</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-sm text-green-200">Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-8 -mt-16 relative z-20">
        {/* Search Bar Overlay */}
        <div className="bg-white rounded-2xl shadow-2xl p-2 mb-8 animate-float">
          <div className="flex flex-col md:flex-row">
            <div className="flex-1 flex items-center px-4">
              <FaSearch className="text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Search by location, property name, or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-4 focus:outline-none text-gray-900"
              />
            </div>
            <button className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105 m-2 md:m-0">
              Search Properties
            </button>
          </div>
        </div>

        {/* Filter Toggle Button with Animation */}
        <div className="mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
          >
            <FaFilter className={`group-hover:rotate-12 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {/* Filters Panel with Slide Animation */}
        <div
          className={`transform transition-all duration-500 ease-in-out overflow-hidden ${
            showFilters ? 'max-h-[800px] opacity-100 mb-8' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Filter Properties</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-500 hover:text-gray-700 transform hover:rotate-90 transition-transform duration-300"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Property Type */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                <select
                  name="type"
                  value={filters.type}
                  onChange={handleFilterChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all duration-300 hover:border-green-400"
                >
                  <option value="all">All Types</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="penthouse">Penthouse</option>
                  <option value="pg">PG</option>
                </select>
              </div>

              {/* City */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <select
                  name="city"
                  value={filters.city}
                  onChange={handleFilterChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all duration-300 hover:border-green-400"
                >
                  <option value="all">All Cities</option>
                  <option value="west_delhi">West Delhi</option>
                  <option value="gurugram">Gurugram</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2">Min Price (₹)</label>
                <input
                  type="number"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  placeholder="e.g., 30000"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all duration-300 hover:border-green-400"
                />
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Price (₹)</label>
                <input
                  type="number"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  placeholder="e.g., 100000"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all duration-300 hover:border-green-400"
                />
              </div>

              {/* Bedrooms */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                <select
                  name="bedrooms"
                  value={filters.bedrooms}
                  onChange={handleFilterChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all duration-300 hover:border-green-400"
                >
                  <option value="any">Any</option>
                  <option value="1">1 BHK</option>
                  <option value="2">2 BHK</option>
                  <option value="3">3 BHK</option>
                  <option value="4">4+ BHK</option>
                </select>
              </div>

              {/* Furnishing */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2">Furnishing</label>
                <select
                  name="furnishing"
                  value={filters.furnishing}
                  onChange={handleFilterChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all duration-300 hover:border-green-400"
                >
                  <option value="any">Any</option>
                  <option value="fully">Fully Furnished</option>
                  <option value="semi">Semi Furnished</option>
                  <option value="unfurnished">Unfurnished</option>
                </select>
              </div>
            </div>

            {/* Reset Button with Hover Effect */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleReset}
                className="text-gray-600 hover:text-green-600 font-medium flex items-center gap-2 group"
              >
                <span className="group-hover:rotate-180 transition-transform duration-300">↻</span>
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing <span className="font-bold text-green-600">{filteredProperties.length}</span> properties
          </p>
          <p className="text-sm text-gray-500">Sorted by: Latest</p>
        </div>

        {/* Properties Grid with Image Transitions */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow">
            <FaHome className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Properties Found</h3>
            <p className="text-gray-600">Try adjusting your filters or search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property, index) => (
              <div
                key={property.id}
                className="group relative animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link href={`/properties/${property.id}`}>
                  <div className="property-card bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                    {/* Image Container with Zoom Effect */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Overlay with gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Verified Badge */}
                      {property.verified && (
                        <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold transform -translate-x-20 group-hover:translate-x-0 transition-transform duration-300 flex items-center gap-1">
                          <span>✅</span> Verified
                        </div>
                      )}
                      
                      {/* Type Badge with Slide Animation */}
                      <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold transform translate-x-20 group-hover:translate-x-0 transition-transform duration-300">
                        {property.type}
                      </div>
                      
                      {/* Rating Badge with Pop Effect */}
                      <div className="absolute bottom-4 left-4 bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 shadow-lg">
                        <FaStar className="text-yellow-400" />
                        {property.rating} ({property.reviews})
                      </div>
                      
                      {/* Quick Actions with Fade In */}
                      <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            toggleLike(property.id)
                          }}
                          className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-green-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                        >
                          <FaHeart className={likedProperties.includes(property.id) ? 'text-red-500' : 'text-gray-400'} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            // Share functionality
                          }}
                          className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-green-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                        >
                          <FaShare className="text-gray-400" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Content with Slide Up */}
                    <div className="p-6 transform group-hover:-translate-y-1 transition-transform duration-300">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                        {property.title}
                      </h3>
                      
                      <div className="flex items-center text-gray-600 mb-4">
                        <FaMapMarkerAlt className="mr-2 text-green-500 group-hover:scale-110 transition-transform" />
                        <span className="text-sm">{property.location}</span>
                      </div>

                      {/* Specs with Fade In */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="text-center text-sm text-gray-600 bg-gray-50 py-2 rounded-lg group-hover:bg-green-50 transition-colors">
                          <span className="font-bold text-gray-900">{property.beds}</span> Beds
                        </div>
                        <div className="text-center text-sm text-gray-600 bg-gray-50 py-2 rounded-lg group-hover:bg-green-50 transition-colors">
                          <span className="font-bold text-gray-900">{property.baths}</span> Baths
                        </div>
                        <div className="text-center text-sm text-gray-600 bg-gray-50 py-2 rounded-lg group-hover:bg-green-50 transition-colors">
                          <span className="font-bold text-gray-900">{property.area}</span> m²
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                        <p className="text-2xl font-bold text-green-600 group-hover:scale-105 transition-transform origin-left">
                          {property.price}
                        </p>
                        <span className="text-green-600 text-sm font-medium group-hover:translate-x-2 transition-transform">
                          View Details →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Load More Button with Animation */}
        {filteredProperties.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl group">
              Load More Properties
              <span className="inline-block ml-2 group-hover:translate-x-2 transition-transform">→</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}