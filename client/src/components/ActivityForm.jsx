import { useState } from 'react';
import api from '../services/api';
import { PlusCircle } from 'lucide-react';

const ActivityForm = ({ onActivityAdded }) => {
    const [formData, setFormData] = useState({
        type: 'transportation',
        value: '',
        unit: 'km',
        date: new Date().toISOString().split('T')[0]
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/activities', formData);
            onActivityAdded(res.data);
            setFormData({ ...formData, value: '' });
        } catch (err) {
            console.error("Error adding activity", err);
        }
    };

    return (
        <div className="card mb-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <PlusCircle className="h-5 w-5 text-primary" />
                Log Activity
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                        className="input-field"
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    >
                        <option value="transportation">Transportation</option>
                        <option value="food">Food</option>
                        <option value="electricity">Electricity</option>
                        <option value="waste">Waste</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            required
                            className="input-field"
                            placeholder="Value"
                            value={formData.value}
                            onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                        />
                        <input
                            type="text"
                            required
                            className="input-field w-24"
                            placeholder="Unit"
                            value={formData.unit}
                            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                        />
                    </div>
                </div>
                <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                        type="date"
                        required
                        className="input-field"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                </div>
                <div className="md:col-span-1">
                    <button type="submit" className="btn-primary w-full flex justify-center items-center gap-2">
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ActivityForm;
