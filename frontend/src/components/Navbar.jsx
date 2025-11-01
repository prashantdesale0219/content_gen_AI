import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-primary">AI Content Generator</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <Link to="/dashboard" className="flex items-center space-x-1 text-gray-700 hover:text-primary">
          <FaTachometerAlt className="text-gray-600" />
          <span>Dashboard</span>
        </Link>
        
        <div className="relative group">
          <button className="flex items-center space-x-2 text-gray-700 hover:text-primary">
            <FaUser className="text-gray-600" />
            <span>{user?.name}</span>
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
            <button 
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;