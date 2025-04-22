import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useWallet } from '../../context/WalletContext'
import { motion } from 'framer-motion'

function Navbar() {
  const { account, connectWallet, disconnectWallet, isConnecting } = useWallet()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  function formatAccount(account) {
    if (!account) return ''
    return `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
  }

  // Determine if a nav link is active
  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <nav className="bg-white border-b-3 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-black">FUND<span className="text-primary-500">CHAIN</span></span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link 
              to="/" 
              className={`text-lg font-bold ${isActive('/') ? 'text-primary-500 underline decoration-4 underline-offset-8' : 'text-black hover:text-primary-500'}`}
            >
              Home
            </Link>
            <Link 
              to="/explore" 
              className={`text-lg font-bold ${isActive('/explore') ? 'text-primary-500 underline decoration-4 underline-offset-8' : 'text-black hover:text-primary-500'}`}
            >
              Explore
            </Link>
            <Link 
              to="/create" 
              className={`text-lg font-bold ${isActive('/create') ? 'text-primary-500 underline decoration-4 underline-offset-8' : 'text-black hover:text-primary-500'}`}
            >
              Create
            </Link>
            {account && (
              <Link 
                to="/profile" 
                className={`text-lg font-bold ${isActive('/profile') ? 'text-primary-500 underline decoration-4 underline-offset-8' : 'text-black hover:text-primary-500'}`}
              >
                Profile
              </Link>
            )}
            
            {account ? (
              <div className="flex items-center space-x-4">
                <span className="badge bg-secondary-500 text-white">
                  {formatAccount(account)}
                </span>
                <button 
                  onClick={disconnectWallet}
                  className="btn-outline py-2 px-4"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button 
                onClick={connectWallet}
                disabled={isConnecting}
                className="btn-primary py-2 px-4 animate-hover animate-click"
              >
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-black"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden bg-white border-y-3 border-black"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className={`block px-3 py-2 text-lg font-bold ${isActive('/') ? 'text-primary-500' : 'text-black'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/explore" 
              className={`block px-3 py-2 text-lg font-bold ${isActive('/explore') ? 'text-primary-500' : 'text-black'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Explore
            </Link>
            <Link 
              to="/create" 
              className={`block px-3 py-2 text-lg font-bold ${isActive('/create') ? 'text-primary-500' : 'text-black'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Create
            </Link>
            {account && (
              <Link 
                to="/profile" 
                className={`block px-3 py-2 text-lg font-bold ${isActive('/profile') ? 'text-primary-500' : 'text-black'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
            )}
            {account ? (
              <div className="px-3 py-2">
                <div className="mb-2">
                  <span className="badge bg-secondary-500 text-white">
                    {formatAccount(account)}
                  </span>
                </div>
                <button 
                  onClick={() => {
                    disconnectWallet();
                    setIsMenuOpen(false);
                  }}
                  className="btn-outline py-2 px-4 w-full"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <div className="px-3 py-2">
                <button 
                  onClick={() => {
                    connectWallet();
                    setIsMenuOpen(false);
                  }}
                  disabled={isConnecting}
                  className="btn-primary py-2 px-4 w-full"
                >
                  {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  )
}

export default Navbar