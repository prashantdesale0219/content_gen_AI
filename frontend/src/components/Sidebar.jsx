import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHome, FaPen, FaHistory, FaStar, FaChartBar, FaTimes } from 'react-icons/fa';

const Sidebar = ({ closeSidebar }) => {
  const { user } = useAuth();
  
  const navItems = [
    { to: '/dashboard', icon: <FaHome />, text: 'Dashboard' },
    { to: '/dashboard/generate', icon: <FaPen />, text: 'Generate Content' },
    { to: '/dashboard/history', icon: <FaHistory />, text: 'Content History' },
  ];
  
  if (user?.isAdmin) {
    navItems.push({ to: '/dashboard/admin', icon: <FaChartBar />, text: 'Admin Dashboard' });
  }

  return (
    <aside className="w-64 bg-dark text-white h-full flex flex-col">
      <div className="p-4 flex-1">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">AI Content Gen</h2>
          <button 
            className="md:hidden text-gray-300 hover:text-white focus:outline-none" 
            onClick={closeSidebar}
          >
            <FaTimes size={20} />
          </button>
        </div>
        
        <nav>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'text-gray-300 hover:bg-gray-700'
                    }`
                  }
                  onClick={() => closeSidebar && window.innerWidth < 768 ? closeSidebar() : null}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
