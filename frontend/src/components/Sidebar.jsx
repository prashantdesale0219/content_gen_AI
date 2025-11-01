import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHome, FaPen, FaHistory, FaStar, FaChartBar } from 'react-icons/fa';

const Sidebar = () => {
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
    <aside className="w-64 bg-dark text-white h-full">
      <div className="p-4">
        <h2 className="text-2xl font-bold text-center mb-6">AI Content Gen</h2>
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