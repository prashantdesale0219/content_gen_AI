import React from 'react';
import { Link } from 'react-router-dom';
import { FaRocket, FaFileAlt, FaChartLine, FaUserFriends, FaTachometerAlt, FaSignInAlt, FaUserPlus, FaMicrophone, FaPlayCircle, FaLightbulb, FaPen, FaSearch, FaImage } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';

const LandingPage = () => {
  const { user } = useAuth();
  const { darkMode } = useTheme();
  
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Navbar */}
      <nav className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md py-4 px-6 sticky top-0 z-50`}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-vidiq-blue'}`}>AI Content Generator</h1>
          </div>
          
          <div className="flex items-center space-x-6">
          
            
            <ThemeToggle />
            
            {!user ? (
              <>
                <Link to="/login" className={`flex items-center space-x-1 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-vidiq-blue'} transition`}>
                  <FaSignInAlt className={darkMode ? 'text-gray-300' : 'text-gray-600'} />
                  <span>Login</span>
                </Link>
                <Link to="/register" className={`flex items-center space-x-1 ${darkMode ? 'bg-vidiq-purple' : 'bg-vidiq-blue'} text-white px-4 py-2 rounded-lg hover:opacity-90 transition`}>
                  <FaUserPlus className="mr-1" />
                  <span>Register</span>
                </Link>
              </>
            ) : (
              <Link to="/dashboard" className={`flex items-center space-x-1 ${darkMode ? 'bg-vidiq-purple' : 'bg-vidiq-blue'} text-gray px-4 py-2 rounded-lg hover:opacity-90 transition`}>
                <span>Go to Dashboard</span>
              </Link>
            )}
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <div className={`${darkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-vidiq-lightBlue to-white'} py-8 md:py-12`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className={`text-4xl md:text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-6`}>
                Your Complete Content Creation Workflow
              </h1>
              <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
                Plan, write, and preview your next content in minutes. Our AI content generator creates titles, descriptions, tags, and even full content, all before you hit publish.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                {!user ? (
                  <>
                    <Link
                      to="/register"
                      className={`${darkMode ? 'bg-vidiq-purple' : 'bg-vidiq-blue'} hover:opacity-90 text-white font-bold py-3 px-6 rounded-lg transition duration-300 text-center`}
                    >
                      Get Started Free
                    </Link>
                    <Link
                      to="/login"
                      className={`${darkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white hover:bg-gray-100 text-vidiq-blue'} font-bold py-3 px-6 rounded-lg border ${darkMode ? 'border-gray-700' : 'border-vidiq-blue'} transition duration-300 text-center`}
                    >
                      Login
                    </Link>
                  </>
                ) : (
                  <Link
                    to="/dashboard"
                    className={`${darkMode ? 'bg-vidiq-purple' : 'bg-vidiq-blue'} hover:opacity-90 text-white font-bold py-3 px-6 rounded-lg transition duration-300 text-center`}
                  >
                    Go to Dashboard
                  </Link>
                )}
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="/src/assets/Gemini_Generated_Image_za39uvza39uvza39.png"
                alt="AI Content Generator"
                className="rounded-lg shadow-xl max-w-md mx-auto h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* What You Can Create Section */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} py-16`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-3xl font-bold text-center ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
            What You Can Create with Our AI Content Generator
          </h2>
          <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto mb-12`}>
            With our AI content generator, you can plan smarter and move faster. Enter your idea and instantly get a full creative package.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className={`${darkMode ? 'bg-gray-700' : 'bg-vidiq-lightBlue'} p-6 rounded-lg shadow-lg`}>
              <div className={`${darkMode ? 'text-vidiq-purple' : 'text-vidiq-blue'} text-3xl mb-4`}>
                <FaFileAlt />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>SEO Optimized Titles</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Generate titles designed to boost clicks and improve search rankings.</p>
            </div>
            
            <div className={`${darkMode ? 'bg-gray-700' : 'bg-vidiq-lightBlue'} p-6 rounded-lg shadow-lg`}>
              <div className={`${darkMode ? 'text-vidiq-purple' : 'text-vidiq-blue'} text-3xl mb-4`}>
                <FaSearch />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Optimized Descriptions</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Create descriptions optimized for better search visibility and engagement.</p>
            </div>
            
            <div className={`${darkMode ? 'bg-gray-700' : 'bg-vidiq-lightBlue'} p-6 rounded-lg shadow-lg`}>
              <div className={`${darkMode ? 'text-vidiq-purple' : 'text-vidiq-blue'} text-3xl mb-4`}>
                <FaImage />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Thumbnail Ideas</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Get creative thumbnail ideas that grab attention and increase click-through rates.</p>
            </div>
            
            <div className={`${darkMode ? 'bg-gray-700' : 'bg-vidiq-lightBlue'} p-6 rounded-lg shadow-lg`}>
              <div className={`${darkMode ? 'text-vidiq-purple' : 'text-vidiq-blue'} text-3xl mb-4`}>
                <FaPen />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Full Content Scripts</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Generate complete, ready-to-use content scripts with natural intros and strong closings.</p>
            </div>
            
            <div className={`${darkMode ? 'bg-gray-700' : 'bg-vidiq-lightBlue'} p-6 rounded-lg shadow-lg`}>
              <div className={`${darkMode ? 'text-vidiq-purple' : 'text-vidiq-blue'} text-3xl mb-4`}>
                <FaMicrophone />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Voice-over Preview</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Hear your content with AI voice-over to gauge tone and pacing before publishing.</p>
            </div>
            
            <div className={`${darkMode ? 'bg-gray-700' : 'bg-vidiq-lightBlue'} p-6 rounded-lg shadow-lg`}>
              <div className={`${darkMode ? 'text-vidiq-purple' : 'text-vidiq-blue'} text-3xl mb-4`}>
                <FaChartLine />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Performance Analytics</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Track how your content performs and get insights to improve future content.</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className={`${darkMode ? 'bg-gray-900' : 'bg-gray-50'} py-16`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-3xl font-bold text-center ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
            How It Works
          </h2>
          <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto mb-12`}>
            Get started in just three simple steps
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg shadow-lg text-center`}>
              <div className={`${darkMode ? 'bg-gray-700' : 'bg-vidiq-lightBlue'} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6`}>
                <span className={`${darkMode ? 'text-vidiq-purple' : 'text-vidiq-blue'} text-2xl font-bold`}>1</span>
              </div>
              <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Enter Your Topic</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Simply enter your content topic or idea, and our AI will do the rest.
              </p>
            </div>
            
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg shadow-lg text-center`}>
              <div className={`${darkMode ? 'bg-gray-700' : 'bg-vidiq-lightBlue'} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6`}>
                <span className={`${darkMode ? 'text-vidiq-purple' : 'text-vidiq-blue'} text-2xl font-bold`}>2</span>
              </div>
              <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Review Options</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Get multiple title, description, and content options to choose from.
              </p>
            </div>
            
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg shadow-lg text-center`}>
              <div className={`${darkMode ? 'bg-gray-700' : 'bg-vidiq-lightBlue'} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6`}>
                <span className={`${darkMode ? 'text-vidiq-purple' : 'text-vidiq-blue'} text-2xl font-bold`}>3</span>
              </div>
              <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Publish & Succeed</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Use our optimized content to grow your audience and engagement.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className={`${darkMode ? 'bg-vidiq-darkBlue' : 'bg-vidiq-blue'} py-16`}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to transform your content creation?
          </h2>
          <div className="flex justify-center mt-8">
            {!user ? (
              <Link
                to="/register"
                className={`${darkMode ? 'bg-vidiq-purple' : 'bg-vidiq-blue'} hover:opacity-90 text-white font-bold py-3 px-8 rounded-lg transition duration-300 text-center text-lg`}
              >
                Start Free Trial
              </Link>
            ) : (
              <Link
                to="/dashboard"
                className={`${darkMode ? 'bg-vidiq-purple' : 'bg-vidiq-blue'} hover:opacity-90 text-white font-bold py-3 px-8 rounded-lg transition duration-300 text-center text-lg`}
              >
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'} py-12`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>AI Content Generator</h3>
              <p className="mb-4">Your complete content creation solution powered by AI.</p>
              <ThemeToggle />
            </div>
            
            <div>
              <h4 className={`text-md font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Features</a></li>
                <li><a href="#" className="hover:underline">Pricing</a></li>
                <li><a href="#" className="hover:underline">Testimonials</a></li>
                <li><a href="#" className="hover:underline">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className={`text-md font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Blog</a></li>
                <li><a href="#" className="hover:underline">Guides</a></li>
                <li><a href="#" className="hover:underline">Support</a></li>
                <li><a href="#" className="hover:underline">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className={`text-md font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">About Us</a></li>
                <li><a href="#" className="hover:underline">Careers</a></li>
                <li><a href="#" className="hover:underline">Contact</a></li>
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} mt-8 pt-8 text-center`}>
            <p>&copy; {new Date().getFullYear()} AI Content Generator. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;