import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Utensils } from 'lucide-react';
import { motion } from 'framer-motion';

const FoodAnalyzer = () => {
    const [foodList, setFoodList] = useState([]);
    const [selectedFood, setSelectedFood] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [result, setResult] = useState(null);

    useEffect(() => {
        const fetchFood = async () => {
            try {
                const res = await api.get('/calc/food');
                setFoodList(res.data);
                if (res.data.length > 0) setSelectedFood(res.data[0].name);
            } catch (err) {
                console.error(err);
            }
        };
        fetchFood();
    }, []);

    const handleSubmit = async () => {
        try {
            const res = await api.post('/calc/food', { foodName: selectedFood, quantity });
            setResult(res.data);
            // Log activity
            await api.post('/activities', {
                type: 'food',
                value: quantity,
                unit: 'kg/servings',
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
                <div className="p-3 bg-green-100 rounded-full text-green-600">
                    <Utensils size={24} />
                </div>
                <h2 className="heading-lg">Food Analyzer</h2>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Select Food Item</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {foodList.map((food) => (
                            <button
                                key={food.name}
                                onClick={() => setSelectedFood(food.name)}
                                className={`p-3 rounded-xl text-sm font-medium transition-all ${selectedFood === food.name
                                        ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                {food.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Quantity (kg or servings)</label>
                    <input
                        type="number"
                        className="input-field"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                </div>

                <button onClick={handleSubmit} className="btn-primary w-full">
                    Analyze & Log
                </button>
            </div>

            {result && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 p-4 bg-green-50 rounded-xl border border-green-100"
                >
                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-sm text-gray-500">Item</p>
                            <p className="text-xl font-bold">{result.food} ({result.quantity})</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500">Carbon Footprint</p>
                            <p className="text-2xl font-bold text-green-600">{result.carbonAmount.toFixed(2)} kg CO₂</p>
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

export default FoodAnalyzer;
