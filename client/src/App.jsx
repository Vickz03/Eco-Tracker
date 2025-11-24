import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Suggestions from './pages/Suggestions';
import Profile from './pages/Profile';
import Survey from './pages/Survey';
import TravelCalculator from './pages/calculators/TravelCalculator';
import ElectricityEstimator from './pages/calculators/ElectricityEstimator';
import FoodAnalyzer from './pages/calculators/FoodAnalyzer';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/suggestions"
                            element={
                                <ProtectedRoute>
                                    <Suggestions />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/survey"
                            element={
                                <ProtectedRoute>
                                    <Survey />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/calc/travel"
                            element={
                                <ProtectedRoute>
                                    <TravelCalculator />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/calc/electricity"
                            element={
                                <ProtectedRoute>
                                    <ElectricityEstimator />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/calc/food"
                            element={
                                <ProtectedRoute>
                                    <FoodAnalyzer />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
