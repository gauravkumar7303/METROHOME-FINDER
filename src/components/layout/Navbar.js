// 'use client'

// import { useState, useEffect } from 'react'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import { FaBars, FaTimes, FaUser } from 'react-icons/fa'

// export default function Navbar() {
//   const pathname = usePathname()
//   const [isLoggedIn, setIsLoggedIn] = useState(false)
//   const [menuOpen, setMenuOpen] = useState(false)
//   const [scrolled, setScrolled] = useState(false)

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50)
//     }
//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   // Check if current page is home or properties (where we want transparent navbar)
//   const isHomePage = pathname === '/'
//   const isPropertiesPage = pathname === '/properties'
//   const isAboutPage = pathname === '/about'
//   const isContactPage = pathname === '/contact'
  
//   // Pages where navbar should be transparent initially
//   const isTransparentPage = isHomePage || isPropertiesPage || isAboutPage || isContactPage

//   const navLinks = [
//     { href: '/', label: 'Home' },
//     { href: '/properties', label: 'Properties' },
//     { href: '/about', label: 'About' },
//     { href: '/contact', label: 'Contact' },
//   ]

//   // Determine navbar background based on scroll and page
//   const getNavbarClass = () => {
//     if (scrolled) {
//       return 'bg-white shadow-md py-2'
//     }
//     if (isTransparentPage) {
//       return 'bg-transparent py-4'
//     }
//     return 'bg-white shadow-md py-2' // Default for other pages
//   }

//   // Determine text color based on scroll and page
//   const getTextColorClass = () => {
//     if (scrolled) {
//       return 'text-gray-700'
//     }
//     if (isTransparentPage) {
//       return 'text-white'
//     }
//     return 'text-gray-700' // Default for other pages
//   }

//   // Determine logo color
//   const getLogoColorClass = () => {
//     if (scrolled) {
//       return 'text-green-600'
//     }
//     if (isTransparentPage) {
//       return 'text-white'
//     }
//     return 'text-green-600' // Default for other pages
//   }

//   // Determine badge style
//   const getBadgeClass = () => {
//     if (scrolled) {
//       return 'bg-green-100 text-green-800'
//     }
//     if (isTransparentPage) {
//       return 'bg-white/20 text-white'
//     }
//     return 'bg-green-100 text-green-800' // Default for other pages
//   }

//   // Determine button style
//   const getButtonClass = (type) => {
//     if (scrolled) {
//       return type === 'primary' 
//         ? 'bg-green-600 text-white hover:bg-green-700' 
//         : 'text-gray-700 hover:text-green-600'
//     }
//     if (isTransparentPage) {
//       return type === 'primary'
//         ? 'bg-white text-green-600 hover:bg-white/90'
//         : 'text-white hover:text-white/80'
//     }
//     return type === 'primary'
//       ? 'bg-green-600 text-white hover:bg-green-700'
//       : 'text-gray-700 hover:text-green-600'
//   }

//   return (
//     <nav 
//       className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${getNavbarClass()}`}
//       style={{ backdropFilter: isTransparentPage && !scrolled ? 'none' : 'none' }}
//     >
//       <div className="container-custom">
//         <div className="flex justify-between items-center">
          
//           {/* Logo */}
//           <Link href="/" className="flex items-center space-x-2 z-50">
//             <span className={`text-2xl font-bold ${getLogoColorClass()} transition-colors duration-300`}>
//               MetroHome
//             </span>
//             <span className={`text-xs px-2 py-1 rounded-full transition-colors duration-300 ${getBadgeClass()}`}>
//               Finder
//             </span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className={`text-sm font-medium transition-colors duration-300 ${
//                   pathname === link.href 
//                     ? scrolled 
//                       ? 'text-green-600 font-bold' 
//                       : isTransparentPage 
//                         ? 'text-white font-bold border-b-2 border-white pb-1' 
//                         : 'text-green-600 font-bold'
//                     : getTextColorClass()
//                 } hover:${scrolled ? 'text-green-600' : isTransparentPage ? 'text-white/80' : 'text-green-600'}`}
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </div>

//           {/* Auth Buttons */}
//           <div className="hidden md:flex items-center space-x-4">
//             {isLoggedIn ? (
//               <Link 
//                 href="/profile" 
//                 className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${getButtonClass('primary')}`}
//               >
//                 <FaUser />
//                 <span>Profile</span>
//               </Link>
//             ) : (
//               <>
//                 <Link 
//                   href="/login" 
//                   className={`transition-colors duration-300 ${getButtonClass('secondary')}`}
//                 >
//                   Login
//                 </Link>
//                 <Link 
//                   href="/register" 
//                   className={`px-4 py-2 rounded-lg transition-all duration-300 ${getButtonClass('primary')}`}
//                 >
//                   Sign Up
//                 </Link>
//               </>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             className={`md:hidden text-2xl z-50 transition-colors duration-300 ${
//               scrolled ? 'text-gray-700' : isTransparentPage ? 'text-white' : 'text-gray-700'
//             }`}
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             {menuOpen ? <FaTimes /> : <FaBars />}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {menuOpen && (
//           <div className={`md:hidden fixed inset-0 z-40 pt-20 ${
//             scrolled || !isTransparentPage ? 'bg-white' : 'bg-black/90 backdrop-blur-lg'
//           }`}>
//             <div className="container-custom">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.href}
//                   href={link.href}
//                   className={`block py-4 text-lg border-b ${
//                     scrolled || !isTransparentPage 
//                       ? 'border-gray-100 text-gray-700 hover:text-green-600' 
//                       : 'border-white/10 text-white hover:text-green-300'
//                   } transition-colors duration-300`}
//                   onClick={() => setMenuOpen(false)}
//                 >
//                   {link.label}
//                 </Link>
//               ))}
//               <div className="mt-8 space-y-4">
//                 {isLoggedIn ? (
//                   <Link 
//                     href="/profile" 
//                     className={`block w-full text-center py-4 rounded-xl font-bold ${
//                       scrolled || !isTransparentPage
//                         ? 'bg-green-600 text-white'
//                         : 'bg-white text-green-600'
//                     }`}
//                   >
//                     Profile
//                   </Link>
//                 ) : (
//                   <>
//                     <Link 
//                       href="/login" 
//                       className={`block text-center py-4 ${
//                         scrolled || !isTransparentPage
//                           ? 'text-gray-700'
//                           : 'text-white'
//                       }`}
//                     >
//                       Login
//                     </Link>
//                     <Link 
//                       href="/register" 
//                       className={`block w-full text-center py-4 rounded-xl font-bold ${
//                         scrolled || !isTransparentPage
//                           ? 'bg-green-600 text-white'
//                           : 'bg-white text-green-600'
//                       }`}
//                     >
//                       Sign Up
//                     </Link>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   )
// }


'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaBars, FaTimes, FaUser, FaHome, FaHeart, FaCog, FaSignOutAlt } from 'react-icons/fa'

export default function Navbar() {
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Mock logged in state
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Check if current page is home or properties (where we want transparent navbar)
  const isHomePage = pathname === '/'
  const isPropertiesPage = pathname === '/properties'
  const isAboutPage = pathname === '/about'
  const isContactPage = pathname === '/contact'
  
  // Pages where navbar should be transparent initially
  const isTransparentPage = isHomePage || isPropertiesPage || isAboutPage || isContactPage

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/properties', label: 'Properties' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  const profileMenuItems = [
    { href: '/profile', label: 'Dashboard', icon: FaUser },
    { href: '/profile/my-properties', label: 'My Properties', icon: FaHome },
    { href: '/profile/saved-properties', label: 'Saved Properties', icon: FaHeart },
    { href: '/profile/settings', label: 'Settings', icon: FaCog },
  ]

  // Determine navbar background based on scroll and page
  const getNavbarClass = () => {
    if (scrolled) {
      return 'bg-white shadow-md py-2'
    }
    if (isTransparentPage) {
      return 'bg-transparent py-4'
    }
    return 'bg-white shadow-md py-2' // Default for other pages
  }

  // Determine text color based on scroll and page
  const getTextColorClass = () => {
    if (scrolled) {
      return 'text-gray-700'
    }
    if (isTransparentPage) {
      return 'text-white'
    }
    return 'text-gray-700' // Default for other pages
  }

  // Determine logo color
  const getLogoColorClass = () => {
    if (scrolled) {
      return 'text-green-600'
    }
    if (isTransparentPage) {
      return 'text-white'
    }
    return 'text-green-600' // Default for other pages
  }

  // Determine badge style
  const getBadgeClass = () => {
    if (scrolled) {
      return 'bg-green-100 text-green-800'
    }
    if (isTransparentPage) {
      return 'bg-white/20 text-white'
    }
    return 'bg-green-100 text-green-800' // Default for other pages
  }

  // Mock user data for profile
  const user = {
    name: 'Rahul Sharma',
    email: 'rahul@email.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  }

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${getNavbarClass()}`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 z-50">
            <span className={`text-2xl font-bold ${getLogoColorClass()} transition-colors duration-300`}>
              MetroHome
            </span>
            <span className={`text-xs px-2 py-1 rounded-full transition-colors duration-300 ${getBadgeClass()}`}>
              Finder
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-300 ${
                  pathname === link.href 
                    ? scrolled 
                      ? 'text-green-600 font-bold' 
                      : isTransparentPage 
                        ? 'text-white font-bold border-b-2 border-white pb-1' 
                        : 'text-green-600 font-bold'
                    : getTextColorClass()
                } hover:${scrolled ? 'text-green-600' : isTransparentPage ? 'text-white/80' : 'text-green-600'}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons / Profile Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="relative">
                {/* Profile Button */}
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    scrolled 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-white text-green-600 hover:bg-white/90'
                  }`}
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="font-medium">Profile</span>
                </button>

                {/* Profile Dropdown Menu */}
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl py-2 z-50 animate-fade-in">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-bold text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>

                    {/* Menu Items */}
                    {profileMenuItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setProfileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all duration-300 ${
                          pathname === item.href ? 'bg-green-50 text-green-600' : ''
                        }`}
                      >
                        <item.icon className="text-lg" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    ))}

                    {/* Logout Button */}
                    <button
                      onClick={() => {
                        setProfileMenuOpen(false)
                        // Handle logout
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-all duration-300 border-t border-gray-100"
                    >
                      <FaSignOutAlt className="text-lg" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className={`transition-colors duration-300 ${
                    scrolled 
                      ? 'text-gray-700 hover:text-green-600' 
                      : 'text-white hover:text-white/80'
                  }`}
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    scrolled 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-white text-green-600 hover:bg-white/90'
                  }`}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden text-2xl z-50 transition-colors duration-300 ${
              scrolled ? 'text-gray-700' : isTransparentPage ? 'text-white' : 'text-gray-700'
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className={`md:hidden fixed inset-0 z-40 pt-20 ${
            scrolled || !isTransparentPage ? 'bg-white' : 'bg-black/90 backdrop-blur-lg'
          }`}>
            <div className="container-custom">
              {/* Mobile Navigation Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block py-4 text-lg border-b ${
                    scrolled || !isTransparentPage 
                      ? 'border-gray-100 text-gray-700 hover:text-green-600' 
                      : 'border-white/10 text-white hover:text-green-300'
                  } transition-colors duration-300`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Profile Section */}
              {isLoggedIn ? (
                <div className="mt-8 space-y-4">
                  {/* User Info */}
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-bold text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>

                  {/* Mobile Profile Menu */}
                  {profileMenuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
                        scrolled || !isTransparentPage
                          ? 'text-gray-700 hover:bg-green-50 hover:text-green-600'
                          : 'text-white hover:bg-white/10'
                      } transition-all duration-300`}
                      onClick={() => setMenuOpen(false)}
                    >
                      <item.icon className="text-lg" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ))}

                  {/* Mobile Logout Button */}
                  <button
                    onClick={() => {
                      setMenuOpen(false)
                      // Handle logout
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-all duration-300"
                  >
                    <FaSignOutAlt className="text-lg" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              ) : (
                <div className="mt-8 space-y-4">
                  <Link 
                    href="/login" 
                    className={`block text-center py-4 ${
                      scrolled || !isTransparentPage
                        ? 'text-gray-700'
                        : 'text-white'
                    }`}
                  >
                    Login
                  </Link>
                  <Link 
                    href="/register" 
                    className={`block w-full text-center py-4 rounded-xl font-bold ${
                      scrolled || !isTransparentPage
                        ? 'bg-green-600 text-white'
                        : 'bg-white text-green-600'
                    }`}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}