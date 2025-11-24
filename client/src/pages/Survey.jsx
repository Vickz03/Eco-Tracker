import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const Survey = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});

    const questions = [
        {
            id: 'commute',
            text: 'How do you usually commute?',
            options: [
                { label: 'Car (Petrol/Diesel)', score: 50 },
                { label: 'Public Transport', score: 20 },
                { label: 'Bike/Walk', score: 0 }
            ]
        },
        {
            id: 'diet',
            text: 'What is your diet like?',
            options: [
                { label: 'Heavy Meat Eater', score: 60 },
                { label: 'Average', score: 40 },
                { label: 'Vegetarian/Vegan', score: 10 }
            ]
        },
        {
            id: 'energy',
            text: 'How often do you use AC?',
            options: [
                { label: 'Daily', score: 40 },
                { label: 'Occasionally', score: 20 },
                { label: 'Never', score: 0 }
            ]
        },
        {
            id: 'waste',
            text: 'Do you recycle?',
            options: [
                { label: 'No', score: 30 },
                { label: 'Sometimes', score: 15 },
                { label: 'Always', score: 0 }
            ]
        }
    ];

    const handleAnswer = (score) => {
        setAnswers({ ...answers, [questions[step].id]: score });
        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            // Finish
            finishSurvey();
        }
    };

    const finishSurvey = () => {
        // Calculate total score (mock logic, ideally send to backend)
        const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
        localStorage.setItem('baselineScore', totalScore);
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="card max-w-lg w-full text-center"
            >
                <div className="mb-8">
                    <span className="text-sm font-medium text-primary uppercase tracking-wider">
                        Question {step + 1} of {questions.length}
                    </span>
                    <h2 className="heading-xl mt-2">{questions[step].text}</h2>
                </div>

                <div className="space-y-4">
                    {questions[step].options.map((option) => (
                        <button
                            key={option.label}
                            onClick={() => handleAnswer(option.score)}
                            className="w-full p-4 rounded-xl border border-gray-200 hover:border-primary hover:bg-primary/5 transition-all text-left flex justify-between items-center group"
                        >
                            <span className="font-medium text-lg text-gray-700 group-hover:text-primary">
                                {option.label}
                            </span>
                            <CheckCircle className="text-gray-200 group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all" />
                        </button>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default Survey;
