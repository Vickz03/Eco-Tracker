import { Lightbulb } from 'lucide-react';

const Suggestions = () => {
    const tips = [
        {
            title: "Switch to LED Bulbs",
            description: "Replace incandescent bulbs with LEDs to save up to 80% energy.",
            impact: "High"
        },
        {
            title: "Use Public Transport",
            description: "Taking a bus or train instead of driving can significantly reduce your carbon footprint.",
            impact: "High"
        },
        {
            title: "Meat-Free Mondays",
            description: "Skipping meat for just one day a week can save water and reduce emissions.",
            impact: "Medium"
        },
        {
            title: "Unplug Electronics",
            description: "Devices consume energy even when turned off. Unplug them when not in use.",
            impact: "Low"
        },
        {
            title: "Reduce Water Waste",
            description: "Fix leaks and take shorter showers to conserve water and energy used to heat it.",
            impact: "Medium"
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <Lightbulb className="h-8 w-8 text-yellow-500" />
                    Eco Suggestions
                </h1>
                <p className="text-gray-600">Simple changes for a greener lifestyle.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tips.map((tip, index) => (
                    <div key={index} className="card hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{tip.title}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${tip.impact === 'High' ? 'bg-green-100 text-green-800' :
                                    tip.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-gray-100 text-gray-800'
                                }`}>
                                {tip.impact} Impact
                            </span>
                        </div>
                        <p className="text-gray-600">{tip.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Suggestions;
