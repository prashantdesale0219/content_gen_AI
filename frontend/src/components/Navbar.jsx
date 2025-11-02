import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaBars } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';

const Navbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 flex justify-between items-center shadow-sm">
      <div className="flex items-center">
        <button 
          className="md:hidden mr-4 text-gray-600 hover:text-gray-900 focus:outline-none" 
          onClick={toggleSidebar}
        >
          <FaBars size={20} />
        </button>
        <span className="text-lg md:text-xl font-semibold truncate">Welcome, {user?.name || 'User'}</span>
      </div>
      
      <div className="flex items-center">
        <div className="relative" ref={dropdownRef}>
          <button 
            className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
              <FaUser />
            </div>
            <span className="hidden sm:inline">{user?.name?.split(' ')[0] || 'User'}</span>
          </button>
          
          {dropdownOpen && (
            <div className="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg py-1 z-10">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;