import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { Leaf, TrendingUp, Zap, Car, Utensils, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useAuth();
    const [activities, setActivities] = useState([]);
    const [totalFootprint, setTotalFootprint] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get('/activities');
                setActivities(res.data);
                // Calculate total from activities + baseline (if any)
                const activityTotal = res.data.reduce((acc, curr) => acc + curr.carbonAmount, 0);
                setTotalFootprint(activityTotal);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Process data for charts
    const categoryData = [
        { name: 'Travel', value: activities.filter(a => a.type === 'transportation').reduce((acc, c) => acc + c.carbonAmount, 0), color: '#3B82F6' },
        { name: 'Energy', value: activities.filter(a => a.type === 'electricity').reduce((acc, c) => acc + c.carbonAmount, 0), color: '#EAB308' },
        { name: 'Food', value: activities.filter(a => a.type === 'food').reduce((acc, c) => acc + c.carbonAmount, 0), color: '#10B981' },
        { name: 'Other', value: activities.filter(a => !['transportation', 'electricity', 'food'].includes(a.type)).reduce((acc, c) => acc + c.carbonAmount, 0), color: '#6B7280' },
    ].filter(d => d.value > 0);

    const recentActivity = activities.slice(0, 5);

    if (loading) return <div className="text-center py-20">Loading your eco-stats...</div>;

    return (
        <div className="page-container space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="heading-xl">Hello, {user?.name?.split(' ')[0]}! 👋</h1>
                    <p className="text-gray-500 mt-1">Here's your carbon footprint overview.</p>
                </div>
                <div className="flex gap-3">
                    <Link to="/calc/travel" className="btn-secondary flex items-center gap-2">
                        <Car size={18} /> Log Travel
                    </Link>
                    <Link to="/calc/food" className="btn-secondary flex items-center gap-2">
                        <Utensils size={18} /> Log Food
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="card bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-none"
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-emerald-100 font-medium">Total Footprint</p>
                            <h2 className="text-4xl font-bold mt-2">{totalFootprint.toFixed(1)} <span className="text-lg font-normal opacity-80">kg CO₂</span></h2>
                        </div>
                        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                            <Leaf size={24} className="text-white" />
                        </div>
                    </div>
                    <div className="mt-6 flex items-center gap-2 text-emerald-50 text-sm">
                        <TrendingUp size={16} />
                        <span>Keep it up! Lower than last week.</span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="card"
                >
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-gray-700">Emissions by Category</h3>
                        <AlertCircle size={20} className="text-gray-400" />
                    </div>
                    <div className="h-32">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={40}
                                    outerRadius={60}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-4 text-xs text-gray-500 mt-2">
                        {categoryData.map(d => (
                            <div key={d.name} className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }}></div>
                                {d.name}
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="card"
                >
                    <h3 className="font-bold text-gray-700 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                        <Link to="/calc/electricity" className="flex items-center gap-3 p-3 rounded-xl hover:bg-yellow-50 transition-colors group">
                            <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg group-hover:bg-yellow-200 transition-colors">
                                <Zap size={20} />
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">Estimate Energy</p>
                                <p className="text-xs text-gray-500">Log home appliances</p>
                            </div>
                        </Link>
                        <Link to="/survey" className="flex items-center gap-3 p-3 rounded-xl hover:bg-purple-50 transition-colors group">
                            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg group-hover:bg-purple-200 transition-colors">
                                <TrendingUp size={20} />
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">Update Baseline</p>
                                <p className="text-xs text-gray-500">Retake lifestyle survey</p>
                            </div>
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Recent Activity Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="card"
            >
                <h3 className="heading-lg mb-6">Recent Activity</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-100 text-gray-500 text-sm">
                                <th className="pb-4 font-medium">Activity</th>
                                <th className="pb-4 font-medium">Date</th>
                                <th className="pb-4 font-medium">Value</th>
                                <th className="pb-4 font-medium text-right">Impact</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {recentActivity.map((activity) => (
                                <tr key={activity._id} className="group hover:bg-gray-50/50 transition-colors">
                                    <td className="py-4 capitalize font-medium text-gray-900">
                                        {activity.type}
                                    </td>
                                    <td className="py-4 text-gray-500">
                                        {new Date(activity.date).toLocaleDateString()}
                                    </td>
                                    <td className="py-4 text-gray-500">
                                        {activity.value} {activity.unit}
                                    </td>
                                    <td className="py-4 text-right font-bold text-gray-900">
                                        {activity.carbonAmount.toFixed(2)} kg
                                    </td>
                                </tr>
                            ))}
                            {recentActivity.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="py-8 text-center text-gray-400">
                                        No activities logged yet. Start by using the calculators!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
};

export default Dashboard;
