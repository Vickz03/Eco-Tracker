import { useState } from 'react';
import api from '../../services/api';
import { Car, MapPin, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';

const TravelCalculator = () => {
    const [formData, setFormData] = useState({
        mode: 'car',
        start: '',
        end: '',
        distance: ''
    });
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post('/calc/travel', formData);
            setResult(res.data);
            // Also log as activity
            await api.post('/activities', {
                type: 'transportation',
                value: res.data.distance,
                unit: 'km',
                date: new Date().toISOString()
            });
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card max-w-2xl mx-auto"
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                    <Car size={24} />
                </div>
                <h2 className="heading-lg">Smart Travel Calculator</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <button
                        type="button"
                        onClick={() => setFormData({ ...formData, mode: 'car' })}
                        className={`p-4 rounded-xl border-2 transition-all ${formData.mode === 'car' ? 'border-primary bg-primary/5' : 'border-gray-100'}`}
                    >
                        <Car className="mx-auto mb-2" />
                        <span className="font-medium">Car</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setFormData({ ...formData, mode: 'bus' })}
                        className={`p-4 rounded-xl border-2 transition-all ${formData.mode === 'bus' ? 'border-primary bg-primary/5' : 'border-gray-100'}`}
                    >
                        <Navigation className="mx-auto mb-2" />
                        <span className="font-medium">Bus/Train</span>
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="relative">
                        <MapPin className="absolute left-4 top-3.5 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Start Location (Optional)"
                            className="input-field pl-12"
                            value={formData.start}
                            onChange={(e) => setFormData({ ...formData, start: e.target.value })}
                        />
                    </div>
                    <div className="relative">
                        <MapPin className="absolute left-4 top-3.5 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Destination (Optional)"
                            className="input-field pl-12"
                            value={formData.end}
                            onChange={(e) => setFormData({ ...formData, end: e.target.value })}
                        />
                    </div>

                    <div className="text-center text-gray-400 text-sm">- OR -</div>

                    <input
                        type="number"
                        placeholder="Distance in km (Manual)"
                        className="input-field"
                        value={formData.distance}
                        onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                    />
                </div>

                <button disabled={loading} className="btn-primary w-full">
                    {loading ? 'Calculating...' : 'Calculate & Log'}
                </button>
            </form>

            {result && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100"
                >
                    <h3 className="font-semibold text-gray-900 mb-2">Result</h3>
                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-sm text-gray-500">Distance</p>
                            <p className="text-xl font-bold">{result.distance.toFixed(1)} km</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500">Carbon Footprint</p>
                            <p className="text-2xl font-bold text-primary">{result.carbonAmount.toFixed(2)} kg CO₂</p>
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

export default TravelCalculator;
