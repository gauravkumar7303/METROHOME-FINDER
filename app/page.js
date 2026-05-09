// import Link from 'next/link'
// import Image from 'next/image'
// import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaCheck, FaStar, FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa'

// export default function HomePage() {
//   // Recent properties with images
//   const recentProperties = [
//     {
//       id: 1,
//       title: 'Moldova Borsașu',
//       location: 'Rajouri Garden, West Delhi',
//       price: '₹45,000/month',
//       image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       beds: 2,
//       baths: 1,
//       area: 100,
//       type: 'Apartment',
//       rating: 4.5,
//       reviews: 128
//     },
//     {
//       id: 2,
//       title: 'Living Family Home',
//       location: 'Sector 14, Gurugram',
//       price: '₹65,000/month',
//       image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       beds: 3,
//       baths: 2,
//       area: 200,
//       type: 'Villa',
//       rating: 4.8,
//       reviews: 256
//     },
//     {
//       id: 3,
//       title: 'Marina Villa Chiappini',
//       location: 'Dwarka, West Delhi',
//       price: '₹85,000/month',
//       image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       beds: 4,
//       baths: 3,
//       area: 300,
//       type: 'Luxury Villa',
//       rating: 4.9,
//       reviews: 342
//     },
//     {
//       id: 4,
//       title: 'Green Park Residence',
//       location: 'Green Park, West Delhi',
//       price: '₹38,000/month',
//       image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       beds: 2,
//       baths: 2,
//       area: 150,
//       type: 'Apartment',
//       rating: 4.3,
//       reviews: 89
//     },
//     {
//       id: 5,
//       title: 'Cyber City Penthouse',
//       location: 'Sector 29, Gurugram',
//       price: '₹1,20,000/month',
//       image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       beds: 3,
//       baths: 3,
//       area: 250,
//       type: 'Penthouse',
//       rating: 5.0,
//       reviews: 67
//     },
//     {
//       id: 6,
//       title: 'Janakpuri Supertech',
//       location: 'Janakpuri, West Delhi',
//       price: '₹55,000/month',
//       image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       beds: 3,
//       baths: 2,
//       area: 180,
//       type: 'Apartment',
//       rating: 4.6,
//       reviews: 178
//     }
//   ]

//   // Popular places with images
//   const popularPlaces = [
//     { name: 'Buzău', image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', count: '245 properties' },
//     { name: 'Chişinău', image: 'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', count: '189 properties' },
//     { name: 'Hârtiovca', image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', count: '112 properties' }
//   ]

//   // Services with icons
//   const services = [
//     { name: 'Selling and buying properties', icon: '🏠', description: 'Expert guidance for your property transactions' },
//     { name: 'Real estate agency', icon: '🏢', description: 'Professional real estate services' },
//     { name: 'Property management', icon: '🔑', description: 'Complete property care and maintenance' },
//     { name: 'Mortgage brokerage', icon: '💰', description: 'Best loan options from top banks' },
//     { name: 'Valuation services', icon: '📊', description: 'Accurate property valuation' },
//     { name: 'Legal services', icon: '⚖️', description: 'Legal assistance for property deals' }
//   ]

//   // Agents with detailed info
//   const agents = [
//     {
//       name: 'Maria Rodriguez',
//       role: 'Senior Property Consultant',
//       experience: '8+ years',
//       properties: '156 sold',
//       image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       phone: '+91 98765 43210',
//       email: 'maria@metrohome.com',
//       rating: 4.9,
//       specialty: 'Luxury Properties'
//     },
//     {
//       name: 'Ionela Popescu',
//       role: 'Real Estate Expert',
//       experience: '6+ years',
//       properties: '98 sold',
//       image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       phone: '+91 98765 43211',
//       email: 'ionela@metrohome.com',
//       rating: 4.8,
//       specialty: 'Commercial Properties'
//     },
//     {
//       name: 'Daniela Marinescu',
//       role: 'Property Advisor',
//       experience: '5+ years',
//       properties: '87 sold',
//       image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       phone: '+91 98765 43212',
//       email: 'daniela@metrohome.com',
//       rating: 4.7,
//       specialty: 'Residential Properties'
//     },
//     {
//       name: 'Elena Dumitrescu',
//       role: 'Investment Specialist',
//       experience: '10+ years',
//       properties: '234 sold',
//       image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       phone: '+91 98765 43213',
//       email: 'elena@metrohome.com',
//       rating: 5.0,
//       specialty: 'Investment Properties'
//     }
//   ]

//   return (
//     <div>
//       {/* HERO SECTION WITH BACKGROUND IMAGE */}
//       <div 
//         className="relative min-h-screen flex items-center justify-center text-white"
//         style={{
//           backgroundImage: 'url("https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//         }}
//       >
//         {/* Overlay */}
//         <div className="absolute inset-0 bg-black/50"></div>
        
//         {/* Content */}
//         <div className="container-custom relative z-10 text-center">
//           <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in">HOME</h1>
//           <p className="text-2xl md:text-3xl mb-4 max-w-3xl mx-auto">Find your perfect property for your home.</p>
//           <p className="text-xl md:text-2xl font-bold text-green-400">Buy or sell your house in few seconds with MetroHome</p>
          
//           {/* Search Bar */}
//           <div className="mt-12 max-w-2xl mx-auto">
//             <div className="flex bg-white rounded-lg overflow-hidden shadow-2xl">
//               <input
//                 type="text"
//                 placeholder="Search by location, property type..."
//                 className="flex-1 px-6 py-4 text-gray-900 focus:outline-none"
//               />
//               <button className="bg-green-500 text-white px-8 py-4 font-semibold hover:bg-green-600 transition">
//                 Search
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* RECENT PROPERTIES SECTION */}
//       <div className="container-custom py-20">
//         <div className="flex justify-between items-center mb-12">
//           <h2 className="text-4xl font-bold text-gray-900">RECENT PROPERTIES</h2>
//           <Link href="/properties" className="text-green-600 hover:text-green-700 font-semibold flex items-center gap-2">
//             View All <span>→</span>
//           </Link>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {recentProperties.map((property) => (
//             <Link key={property.id} href={`/properties/${property.id}`} className="property-card group">
//               {/* Image Container */}
//               <div className="relative h-64 overflow-hidden">
//                 <img
//                   src={property.image}
//                   alt={property.title}
//                   className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
//                 />
//                 {/* Type Badge */}
//                 <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
//                   {property.type}
//                 </div>
//                 {/* Rating Badge */}
//                 <div className="absolute top-4 right-4 bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 shadow-lg">
//                   <FaStar className="text-yellow-400" />
//                   {property.rating} ({property.reviews})
//                 </div>
//                 {/* Price Tag */}
//                 <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg font-bold">
//                   {property.price}
//                 </div>
//               </div>
              
//               {/* Content */}
//               <div className="p-6">
//                 <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
                
//                 <div className="flex items-center text-gray-600 mb-4">
//                   <FaMapMarkerAlt className="mr-2 text-green-500" />
//                   <span className="text-sm">{property.location}</span>
//                 </div>

//                 {/* Specs Grid */}
//                 <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-gray-100">
//                   <div className="text-center">
//                     <FaBed className="mx-auto text-xl text-green-500 mb-1" />
//                     <span className="text-sm text-gray-600">{property.beds} Beds</span>
//                   </div>
//                   <div className="text-center">
//                     <FaBath className="mx-auto text-xl text-green-500 mb-1" />
//                     <span className="text-sm text-gray-600">{property.baths} Baths</span>
//                   </div>
//                   <div className="text-center">
//                     <FaRulerCombined className="mx-auto text-xl text-green-500 mb-1" />
//                     <span className="text-sm text-gray-600">{property.area} m²</span>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>

//       {/* MOST POPULAR PLACES */}
//       <div className="bg-gray-50 py-20">
//         <div className="container-custom">
//           <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">MOST POPULAR PLACES</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {popularPlaces.map((place, index) => (
//               <Link
//                 key={index}
//                 href={`/properties?location=${encodeURIComponent(place.name)}`}
//                 className="group relative h-80 rounded-2xl overflow-hidden"
//               >
//                 <img
//                   src={place.image}
//                   alt={place.name}
//                   className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
//                 <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
//                   <h3 className="text-2xl font-bold mb-2">{place.name}</h3>
//                   <p className="text-green-400 font-semibold">{place.count}</p>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* OUR SERVICES */}
//       <div className="container-custom py-20">
//         <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">OUR SERVICES</h2>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {services.map((service, index) => (
//             <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition group">
//               <div className="text-4xl mb-4 group-hover:scale-110 transition">{service.icon}</div>
//               <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
//               <p className="text-gray-600">{service.description}</p>
//               <div className="mt-4 flex items-center text-green-600 font-semibold">
//                 <span>Learn more</span>
//                 <span className="ml-2 group-hover:translate-x-2 transition">→</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* MEET OUR AGENTS */}
//       <div className="bg-gray-50 py-20">
//         <div className="container-custom">
//           <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">MEET OUR AGENTS</h2>
//           <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">Our experienced team is here to help you find your dream property</p>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {agents.map((agent, index) => (
//               <div key={index} className="agent-card group">
//                 <div className="relative mb-6">
//                   <img
//                     src={agent.image}
//                     alt={agent.name}
//                     className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-green-500 group-hover:scale-110 transition duration-300"
//                   />
//                   <div className="absolute -bottom-2 right-1/2 translate-x-16 bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-sm font-bold flex items-center gap-1">
//                     <FaStar className="text-white" />
//                     {agent.rating}
//                   </div>
//                 </div>
                
//                 <h3 className="text-xl font-bold text-gray-900 mb-1">{agent.name}</h3>
//                 <p className="text-green-600 font-semibold mb-2">{agent.role}</p>
//                 <p className="text-sm text-gray-500 mb-1">{agent.experience} experience</p>
//                 <p className="text-sm text-gray-500 mb-3">{agent.properties}</p>
//                 <p className="text-sm text-gray-600 mb-3 bg-gray-100 px-3 py-1 rounded-full inline-block">
//                   {agent.specialty}
//                 </p>
                
//                 {/* Contact Icons */}
//                 <div className="flex justify-center space-x-3 mt-4">
//                   <a href={`tel:${agent.phone}`} className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition">
//                     <FaPhone className="text-sm" />
//                   </a>
//                   <a href={`mailto:${agent.email}`} className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition">
//                     <FaEnvelope className="text-sm" />
//                   </a>
//                   <a href="#" className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white hover:bg-green-700 transition">
//                     <FaWhatsapp className="text-sm" />
//                   </a>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* NEWSLETTER SECTION */}
//       <div className="container-custom py-20">
//         <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-16 text-center text-white relative overflow-hidden">
//           {/* Decorative elements */}
//           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
//           <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
          
//           <div className="relative z-10">
//             <h2 className="text-4xl font-bold mb-4">OUR NEWSLETTER</h2>
//             <p className="text-xl mb-8 text-green-100">Sign up to get the latest property updates</p>
            
//             <form className="max-w-md mx-auto">
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <input
//                   type="email"
//                   placeholder="Enter your email address"
//                   className="flex-1 px-6 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-green-300"
//                 />
//                 <button 
//                   type="submit" 
//                   className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition transform hover:scale-105"
//                 >
//                   Subscribe
//                 </button>
//               </div>
//               <p className="text-sm text-green-200 mt-4">We respect your privacy. Unsubscribe anytime.</p>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

import Link from 'next/link'
import { FaStar, FaArrowRight } from 'react-icons/fa'

export default function HomePage() {
  // Recent properties data
  const recentProperties = [
    {
      id: 1,
      title: 'Moldova Borsașu',
      location: 'Rajouri Garden, West Delhi',
      price: '₹45,000/month',
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      beds: 2,
      baths: 1,
      area: 100,
      type: 'Apartment',
      rating: 4.5,
      reviews: 128
    },
    {
      id: 2,
      title: 'Living Family Home',
      location: 'Sector 14, Gurugram',
      price: '₹65,000/month',
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      beds: 3,
      baths: 2,
      area: 200,
      type: 'Villa',
      rating: 4.8,
      reviews: 256
    },
    {
      id: 3,
      title: 'Marina Villa Chiappini',
      location: 'Dwarka, West Delhi',
      price: '₹85,000/month',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      beds: 4,
      baths: 3,
      area: 300,
      type: 'Luxury Villa',
      rating: 4.9,
      reviews: 342
    }
  ]

  // Popular places with images
  const popularPlaces = [
    { name: 'Rajouri Garden', image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', count: '245 properties' },
    { name: 'Dwarka', image: 'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', count: '189 properties' },
    { name: 'Gurugram', image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', count: '312 properties' }
  ]

  // Services with icons
  const services = [
    { name: 'Selling and buying properties', icon: '🏠', description: 'Expert guidance for your property transactions' },
    { name: 'Real estate agency', icon: '🏢', description: 'Professional real estate services' },
    { name: 'Property management', icon: '🔑', description: 'Complete property care and maintenance' },
    { name: 'Mortgage brokerage', icon: '💰', description: 'Best loan options from top banks' },
    { name: 'Valuation services', icon: '📊', description: 'Accurate property valuation' },
    { name: 'Legal services', icon: '⚖️', description: 'Legal assistance for property deals' }
  ]

  // Agents with detailed info
  const agents = [
    {
      name: 'Maria Rodriguez',
      role: 'Senior Property Consultant',
      experience: '8+ years',
      properties: '156 sold',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.9,
      specialty: 'Luxury Properties'
    },
    {
      name: 'Ionela Popescu',
      role: 'Real Estate Expert',
      experience: '6+ years',
      properties: '98 sold',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      specialty: 'Commercial Properties'
    },
    {
      name: 'Daniela Marinescu',
      role: 'Property Advisor',
      experience: '5+ years',
      properties: '87 sold',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.7,
      specialty: 'Residential Properties'
    }
  ]

  return (
    <div>
      {/* HERO SECTION */}
      <div 
        className="relative min-h-screen flex items-center justify-center text-white"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in">HOME</h1>
          <p className="text-2xl md:text-3xl mb-4 max-w-3xl mx-auto">Find your perfect property for your home.</p>
          <p className="text-xl md:text-2xl font-bold text-green-400">Buy or sell your house in few seconds with MetroHome</p>
          
          {/* Search Bar */}
          <div className="mt-12 max-w-2xl mx-auto">
            <div className="flex bg-white rounded-lg overflow-hidden shadow-2xl">
              <input
                type="text"
                placeholder="Search by location, property type..."
                className="flex-1 px-6 py-4 text-gray-900 focus:outline-none"
              />
              <button className="bg-green-500 text-white px-8 py-4 font-semibold hover:bg-green-600 transition">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RECENT PROPERTIES SECTION */}
      <div className="container-custom py-20">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">RECENT PROPERTIES</h2>
          <Link href="/properties" className="text-green-600 hover:text-green-700 font-semibold flex items-center gap-2">
            View All <FaArrowRight />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentProperties.map((property) => (
            <Link key={property.id} href={`/properties/${property.id}`} className="property-card group">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {property.type}
                </div>
                <div className="absolute top-4 right-4 bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 shadow-lg">
                  <FaStar className="text-yellow-400" />
                  {property.rating}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
                <p className="text-gray-600 mb-4">{property.location}</p>
                <p className="text-2xl font-bold text-green-600">{property.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* MOST POPULAR PLACES */}
      <div className="bg-gray-50 py-20">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">MOST POPULAR PLACES</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularPlaces.map((place, index) => (
              <Link
                key={index}
                href={`/properties?location=${encodeURIComponent(place.name)}`}
                className="group relative h-80 rounded-2xl overflow-hidden"
              >
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{place.name}</h3>
                  <p className="text-green-400 font-semibold">{place.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* OUR SERVICES */}
      <div className="container-custom py-20">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">OUR SERVICES</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* MEET OUR AGENTS */}
      <div className="bg-gray-50 py-20">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">MEET OUR AGENTS</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">Our experienced team is here to help you find your dream property</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {agents.map((agent, index) => (
              <div key={index} className="agent-card group">
                <div className="relative mb-6">
                  <img
                    src={agent.image}
                    alt={agent.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-green-500 group-hover:scale-110 transition duration-300"
                  />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-1">{agent.name}</h3>
                <p className="text-green-600 font-semibold mb-2">{agent.role}</p>
                <p className="text-sm text-gray-500 mb-1">{agent.experience} experience</p>
                <p className="text-sm text-gray-500 mb-3">{agent.properties}</p>
                <p className="text-sm text-gray-600 mb-3 bg-gray-100 px-3 py-1 rounded-full inline-block">
                  {agent.specialty}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NEWSLETTER SECTION */}
      <div className="container-custom py-20">
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-16 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4">OUR NEWSLETTER</h2>
            <p className="text-xl mb-8 text-green-100">Sign up to get the latest property updates</p>
            
            <form className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-green-300"
                />
                <button 
                  type="submit" 
                  className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition transform hover:scale-105"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}