import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Leaf, LogOut, User, BarChart2 } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl">
                            <Leaf className="h-6 w-6" />
                            <span>EcoTrack</span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        {user ? (
                            <>
                                <Link to="/dashboard" className="text-gray-600 hover:text-primary transition-colors flex items-center gap-1">
                                    <BarChart2 className="h-5 w-5" />
                                    <span className="hidden sm:inline">Dashboard</span>
                                </Link>
                                <Link to="/calc/travel" className="text-gray-600 hover:text-primary transition-colors">Travel</Link>
                                <Link to="/calc/electricity" className="text-gray-600 hover:text-primary transition-colors">Energy</Link>
                                <Link to="/calc/food" className="text-gray-600 hover:text-primary transition-colors">Food</Link>
                                <Link to="/profile" className="text-gray-600 hover:text-primary transition-colors">Profile</Link>
                                <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                                    <span className="text-sm font-medium text-gray-700 hidden sm:block">{user.name}</span>
                                    <button onClick={handleLogout} className="text-gray-500 hover:text-red-500 transition-colors" title="Logout">
                                        <LogOut className="h-5 w-5" />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-600 hover:text-primary font-medium transition-colors">Login</Link>
                                <Link to="/register" className="btn-primary">Get Started</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
