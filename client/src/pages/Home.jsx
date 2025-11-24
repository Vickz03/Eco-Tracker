import { Link } from 'react-router-dom';
import { ArrowRight, BarChart2, Globe, ShieldCheck } from 'lucide-react';

const Home = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                            <div className="sm:text-center lg:text-left">
                                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                    <span className="block xl:inline">Track your daily</span>{' '}
                                    <span className="block text-primary xl:inline">carbon footprint</span>
                                </h1>
                                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                    Make your life greener by tracking your daily activities. Visualize your impact, get personalized tips, and contribute to a sustainable future.
                                </p>
                                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                    <div className="rounded-md shadow">
                                        <Link to="/register" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-emerald-600 md:py-4 md:text-lg md:px-10">
                                            Get Started
                                        </Link>
                                    </div>
                                    <div className="mt-3 sm:mt-0 sm:ml-3">
                                        <Link to="/login" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-green-100 hover:bg-green-200 md:py-4 md:text-lg md:px-10">
                                            Log In
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
                <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-gray-50 flex items-center justify-center">
                    <div className="text-9xl">🌱</div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-12 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center">
                        <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Features</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            A better way to live sustainably
                        </p>
                    </div>

                    <div className="mt-10">
                        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                            <div className="relative">
                                <dt>
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                                        <BarChart2 className="h-6 w-6" />
                                    </div>
                                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Real-time Tracking</p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-gray-500">
                                    Log your daily activities and instantly see their carbon impact with our advanced calculator.
                                </dd>
                            </div>

                            <div className="relative">
                                <dt>
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                                        <Globe className="h-6 w-6" />
                                    </div>
                                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Global Impact</p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-gray-500">
                                    Understand how your lifestyle compares to global averages and set reduction goals.
                                </dd>
                            </div>

                            <div className="relative">
                                <dt>
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                                        <ShieldCheck className="h-6 w-6" />
                                    </div>
                                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Secure Data</p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-gray-500">
                                    Your data is private and secure. We use industry-standard encryption to protect your information.
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
