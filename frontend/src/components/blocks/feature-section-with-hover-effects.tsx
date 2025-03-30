import React from 'react';

export const FeaturesSectionWithHoverEffects = () => {
    const features = [
        {
            title: "Emotional Support",
            description: "24/7 compassionate AI companion ready to listen and support you",
            icon: "❤️"
        },
        {
            title: "Personal Growth",
            description: "Guided self-reflection and development tools",
            icon: "🌱"
        },
        {
            title: "Safe Space",
            description: "Private and secure environment for your conversations",
            icon: "🛡️"
        }
    ];

    return (
        <div className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12">
                        Features that empower your journey
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
                        >
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}; 