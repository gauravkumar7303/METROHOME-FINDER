// 'use client'

// import { useState, useEffect } from 'react'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import { FaBars, FaTimes } from 'react-icons/fa'

// export default function Navbar() {
//   const pathname = usePathname()
//   const [isLoggedIn, setIsLoggedIn] = useState(false)
//   const [menuOpen, setMenuOpen] = useState(false)
//   const [scrolled, setScrolled] = useState(false)

//   // Detect scroll for navbar background
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50)
//     }
//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   const navLinks = [
//     { href: '/', label: 'Home' },
//     { href: '/properties', label: 'Properties' },
//     { href: '/add-property', label: 'Add Property' },
//     { href: '/about', label: 'About' },
//     { href: '/contact', label: 'Contact' },
//   ]

//   return (
//     <nav 
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
//       }`}
//     >
//       <div className="container-custom">
//         <div className="flex justify-between items-center">
          
//           {/* Logo */}
//           <Link href="/" className="flex items-center space-x-2">
//             <span className={`text-2xl font-bold ${scrolled ? 'text-green-600' : 'text-white'}`}>
//               MetroHome
//             </span>
//             <span className={`text-xs px-2 py-1 rounded-full ${
//               scrolled ? 'bg-green-100 text-green-800' : 'bg-white/20 text-white'
//             }`}>
//               Finder
//             </span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className={`text-sm font-medium transition ${
//                   scrolled 
//                     ? 'text-gray-700 hover:text-green-600' 
//                     : 'text-white hover:text-white/80'
//                 } ${pathname === link.href ? (scrolled ? 'text-green-600' : 'text-white font-bold') : ''}`}
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </div>

//           {/* Auth Buttons */}
//           <div className="hidden md:flex items-center space-x-4">
//             {isLoggedIn ? (
//               <Link 
//                 href="/dashboard" 
//                 className={scrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-white/80'}
//               >
//                 Dashboard
//               </Link>
//             ) : (
//               <>
//                 <Link 
//                   href="/login" 
//                   className={scrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-white/80'}
//                 >
//                   Login
//                 </Link>
//                 <Link 
//                   href="/register" 
//                   className={`px-4 py-2 rounded-lg transition ${
//                     scrolled 
//                       ? 'bg-green-600 text-white hover:bg-green-700' 
//                       : 'bg-white text-green-600 hover:bg-white/90'
//                   }`}
//                 >
//                   Sign Up
//                 </Link>
//               </>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             className={`md:hidden text-2xl ${scrolled ? 'text-gray-700' : 'text-white'}`}
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             {menuOpen ? <FaTimes /> : <FaBars />}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {menuOpen && (
//           <div className={`md:hidden py-4 mt-4 rounded-lg ${
//             scrolled ? 'bg-white' : 'bg-black/20 backdrop-blur-md'
//           }`}>
//             {navLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className={`block py-2 px-4 transition ${
//                   scrolled 
//                     ? 'text-gray-700 hover:text-green-600' 
//                     : 'text-white hover:bg-white/10'
//                 }`}
//                 onClick={() => setMenuOpen(false)}
//               >
//                 {link.label}
//               </Link>
//             ))}
//             <div className="border-t mt-4 pt-4 px-4">
//               {isLoggedIn ? (
//                 <Link 
//                   href="/dashboard" 
//                   className={`block py-2 ${scrolled ? 'text-gray-700' : 'text-white'}`}
//                 >
//                   Dashboard
//                 </Link>
//               ) : (
//                 <>
//                   <Link 
//                     href="/login" 
//                     className={`block py-2 ${scrolled ? 'text-gray-700' : 'text-white'}`}
//                   >
//                     Login
//                   </Link>
//                   <Link 
//                     href="/register" 
//                     className={`block py-2 mt-2 text-center px-4 rounded-lg ${
//                       scrolled 
//                         ? 'bg-green-600 text-white' 
//                         : 'bg-white text-green-600'
//                     }`}
//                   >
//                     Sign Up
//                   </Link>
//                 </>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   )
// }
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

//   const navLinks = [
//     { href: '/', label: 'Home' },
//     { href: '/properties', label: 'Properties' },
//     { href: '/about', label: 'About' },
//     { href: '/contact', label: 'Contact' },
//   ]

//   return (
//     <nav 
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
//       }`}
//     >
//       <div className="container-custom">
//         <div className="flex justify-between items-center">
          
//           {/* Logo */}
//           <Link href="/" className="flex items-center space-x-2">
//             <span className={`text-2xl font-bold ${scrolled ? 'text-green-600' : 'text-white'}`}>
//               MetroHome
//             </span>
//             <span className={`text-xs px-2 py-1 rounded-full ${
//               scrolled ? 'bg-green-100 text-green-800' : 'bg-white/20 text-white'
//             }`}>
//               Finder
//             </span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className={`text-sm font-medium transition ${
//                   scrolled 
//                     ? 'text-gray-700 hover:text-green-600' 
//                     : 'text-white hover:text-white/80'
//                 } ${pathname === link.href ? (scrolled ? 'text-green-600' : 'text-white font-bold') : ''}`}
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
//                 className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
//                   scrolled 
//                     ? 'bg-green-600 text-white hover:bg-green-700' 
//                     : 'bg-white text-green-600 hover:bg-white/90'
//                 }`}
//               >
//                 <FaUser />
//                 <span>Profile</span>
//               </Link>
//             ) : (
//               <>
//                 <Link 
//                   href="/login" 
//                   className={scrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-white/80'}
//                 >
//                   Login
//                 </Link>
//                 <Link 
//                   href="/register" 
//                   className={`px-4 py-2 rounded-lg transition ${
//                     scrolled 
//                       ? 'bg-green-600 text-white hover:bg-green-700' 
//                       : 'bg-white text-green-600 hover:bg-white/90'
//                   }`}
//                 >
//                   Sign Up
//                 </Link>
//               </>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             className={`md:hidden text-2xl ${scrolled ? 'text-gray-700' : 'text-white'}`}
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             {menuOpen ? <FaTimes /> : <FaBars />}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {menuOpen && (
//           <div className={`md:hidden py-4 mt-4 rounded-lg ${
//             scrolled ? 'bg-white' : 'bg-black/20 backdrop-blur-md'
//           }`}>
//             {navLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className={`block py-2 px-4 transition ${
//                   scrolled 
//                     ? 'text-gray-700 hover:text-green-600' 
//                     : 'text-white hover:bg-white/10'
//                 }`}
//                 onClick={() => setMenuOpen(false)}
//               >
//                 {link.label}
//               </Link>
//             ))}
//             <div className="border-t mt-4 pt-4 px-4">
//               {isLoggedIn ? (
//                 <Link 
//                   href="/profile" 
//                   className={`block py-2 px-4 rounded-lg text-center ${
//                     scrolled 
//                       ? 'bg-green-600 text-white' 
//                       : 'bg-white text-green-600'
//                   }`}
//                 >
//                   Profile
//                 </Link>
//               ) : (
//                 <>
//                   <Link 
//                     href="/login" 
//                     className={`block py-2 ${scrolled ? 'text-gray-700' : 'text-white'}`}
//                   >
//                     Login
//                   </Link>
//                   <Link 
//                     href="/register" 
//                     className={`block py-2 mt-2 text-center px-4 rounded-lg ${
//                       scrolled 
//                         ? 'bg-green-600 text-white' 
//                         : 'bg-white text-green-600'
//                     }`}
//                   >
//                     Sign Up
//                   </Link>
//                 </>
//               )}
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
import { FaBars, FaTimes, FaUser } from 'react-icons/fa'

export default function Navbar() {
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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

  // Determine button style
  const getButtonClass = (type) => {
    if (scrolled) {
      return type === 'primary' 
        ? 'bg-green-600 text-white hover:bg-green-700' 
        : 'text-gray-700 hover:text-green-600'
    }
    if (isTransparentPage) {
      return type === 'primary'
        ? 'bg-white text-green-600 hover:bg-white/90'
        : 'text-white hover:text-white/80'
    }
    return type === 'primary'
      ? 'bg-green-600 text-white hover:bg-green-700'
      : 'text-gray-700 hover:text-green-600'
  }

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${getNavbarClass()}`}
      style={{ backdropFilter: isTransparentPage && !scrolled ? 'none' : 'none' }}
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

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <Link 
                href="/profile" 
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${getButtonClass('primary')}`}
              >
                <FaUser />
                <span>Profile</span>
              </Link>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className={`transition-colors duration-300 ${getButtonClass('secondary')}`}
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${getButtonClass('primary')}`}
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
              <div className="mt-8 space-y-4">
                {isLoggedIn ? (
                  <Link 
                    href="/profile" 
                    className={`block w-full text-center py-4 rounded-xl font-bold ${
                      scrolled || !isTransparentPage
                        ? 'bg-green-600 text-white'
                        : 'bg-white text-green-600'
                    }`}
                  >
                    Profile
                  </Link>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}