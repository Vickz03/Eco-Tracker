import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Target, Award } from 'lucide-react';

const Profile = () => {
    const { user } = useAuth();
    const [goal, setGoal] = useState(user?.monthlyGoal || 0);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-3xl mx-auto">
                <div className="card mb-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-primary/10 p-4 rounded-full">
                            <User className="h-12 w-12 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
                            <p className="text-gray-600">{user?.email}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-100 pt-6">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Total Footprint</h3>
                            <p className="text-3xl font-bold text-gray-900">{user?.totalFootprint?.toFixed(1) || 0} <span className="text-sm font-normal text-gray-500">kg CO₂</span></p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Joined</h3>
                            <p className="text-lg text-gray-900">{new Date(user?.createdAt || Date.now()).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>

                <div className="card mb-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Target className="h-5 w-5 text-primary" />
                        Monthly Goal
                    </h3>
                    <div className="flex gap-4 items-end">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Target Emission (kg CO₂)</label>
                            <input
                                type="number"
                                className="input-field"
                                value={goal}
                                onChange={(e) => setGoal(e.target.value)}
                            />
                        </div>
                        <button className="btn-primary">Update Goal</button>
                    </div>
                </div>

                <div className="card">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Award className="h-5 w-5 text-yellow-500" />
                        Achievements
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="border border-gray-200 rounded-lg p-4 flex items-center gap-3 opacity-50">
                            <div className="bg-gray-100 p-2 rounded-full">
                                <Award className="h-6 w-6 text-gray-400" />
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900">Carbon Neutral</h4>
                                <p className="text-xs text-gray-500">Offset your entire footprint</p>
                            </div>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4 flex items-center gap-3">
                            <div className="bg-green-100 p-2 rounded-full">
                                <Award className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900">First Step</h4>
                                <p className="text-xs text-gray-500">Log your first activity</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
