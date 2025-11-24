import { useState } from 'react';
import api from '../../services/api';
import { Zap, Plus, Trash } from 'lucide-react';
import { motion } from 'framer-motion';

const ElectricityEstimator = () => {
    const [appliances, setAppliances] = useState([
        { type: 'ac', hours: 0, count: 1 }
    ]);
    const [result, setResult] = useState(null);

    const addAppliance = () => {
        setAppliances([...appliances, { type: 'fan', hours: 0, count: 1 }]);
    };

    const removeAppliance = (index) => {
        setAppliances(appliances.filter((_, i) => i !== index));
    };

    const updateAppliance = (index, field, value) => {
        const newApps = [...appliances];
        newApps[index][field] = value;
        setAppliances(newApps);
    };

    const handleSubmit = async () => {
        try {
            const res = await api.post('/calc/electricity', { appliances });
            setResult(res.data);
            // Log activity
            await api.post('/activities', {
                type: 'electricity',
                value: res.data.totalKWh,
                unit: 'kWh',
                date: new Date().toISOString()
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card max-w-2xl mx-auto"
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-yellow-100 rounded-full text-yellow-600">
                    <Zap size={24} />
                </div>
                <h2 className="heading-lg">Electricity Estimator</h2>
            </div>

            <div className="space-y-4 mb-6">
                {appliances.map((app, index) => (
                    <div key={index} className="flex gap-4 items-end bg-gray-50 p-4 rounded-xl">
                        <div className="flex-1">
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Appliance</label>
                            <select
                                className="input-field py-2"
                                value={app.type}
                                onChange={(e) => updateAppliance(index, 'type', e.target.value)}
                            >
                                <option value="ac">Air Conditioner</option>
                                <option value="fan">Fan</option>
                                <option value="light">Light Bulb</option>
                                <option value="fridge">Refrigerator</option>
                                <option value="tv">TV</option>
                                <option value="laptop">Laptop</option>
                                <option value="washing_machine">Washing Machine</option>
                            </select>
                        </div>
                        <div className="w-24">
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Hours/Day</label>
                            <input
                                type="number"
                                className="input-field py-2"
                                value={app.hours}
                                onChange={(e) => updateAppliance(index, 'hours', Number(e.target.value))}
                            />
                        </div>
                        <div className="w-20">
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Count</label>
                            <input
                                type="number"
                                className="input-field py-2"
                                value={app.count}
                                onChange={(e) => updateAppliance(index, 'count', Number(e.target.value))}
                            />
                        </div>
                        <button
                            onClick={() => removeAppliance(index)}
                            className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <Trash size={20} />
                        </button>
                    </div>
                ))}
            </div>

            <div className="flex gap-4">
                <button onClick={addAppliance} className="btn-secondary flex items-center gap-2">
                    <Plus size={20} /> Add Appliance
                </button>
                <button onClick={handleSubmit} className="btn-primary flex-1">
                    Calculate & Log
                </button>
            </div>

            {result && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-100"
                >
                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-sm text-gray-500">Total Consumption</p>
                            <p className="text-xl font-bold">{result.totalKWh.toFixed(1)} kWh</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500">Carbon Footprint</p>
                            <p className="text-2xl font-bold text-yellow-600">{result.carbonAmount.toFixed(2)} kg CO₂</p>
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

export default ElectricityEstimator;
