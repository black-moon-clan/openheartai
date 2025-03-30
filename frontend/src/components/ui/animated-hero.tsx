import React from 'react';

export const Hero = () => {
    return (
        <div className="relative min-h-[600px] flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600">
            <div className="text-center text-white p-8">
                <h1 className="text-5xl font-bold mb-6 animate-fade-in">
                    Welcome to OpenHeart AI
                </h1>
                <p className="text-xl mb-8 max-w-2xl mx-auto">
                    Your compassionate AI companion for emotional well-being and personal growth
                </p>
                <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all">
                    Get Started
                </button>
            </div>
        </div>
    );
}; 