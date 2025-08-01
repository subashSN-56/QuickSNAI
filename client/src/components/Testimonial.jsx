import React from 'react';

const Testimonial = () => {
    const [tooltip, setTooltip] = React.useState({
        visible: false,
        x: 0,
        y: 0,
        text: '',
    });

    const wrapperRef = React.useRef(null);

    const testimonials = [
        {
            name: 'John Doe',
            title: 'Frontend Developer',
            message:
                'Integrating this component into our project was seamless and saved us countless hours of development and testing. Highly recommended!',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
        },
        {
            name: 'Jane Smith',
            title: 'Full Stack Engineer',
            message:
                'This solution not only simplified our workflow but also improved our UI consistency across the board. Excellent tool for modern teams.',
            image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
        },
        {
            name: 'Bonnie Green',
            title: 'UX Designer',
            message:
                'I was impressed with how intuitive and flexible the design was. It allowed us to rapidly prototype and launch features with confidence.',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop',
        },
    ];

    const handleMouseMove = (e, index) => {
        if (!wrapperRef.current) return;
        const bounds = wrapperRef.current.getBoundingClientRect();
        setTooltip({
            visible: true,
            x: e.clientX - bounds.left + 8,
            y: e.clientY - bounds.top + 8,
            text: testimonials[index].name,
        });
    };

    const handleMouseLeave = () => {
        setTooltip({ ...tooltip, visible: false });
    };

    return (
        <div ref={wrapperRef} className="relative">
            <h1 className="text-center text-4xl font-bold text-gray-900">Loved By Creators</h1>
            <p className="text-center text-gray-500 mt-1">
                We have collected some testimonials from our users. They are real people who have used our product.
            </p>

            {/* Global Tooltip */}
            {tooltip.visible && (
                <span
                    className="absolute px-2.5 py-1 text-sm rounded bg-indigo-500 text-white pointer-events-none z-50"
                    style={{
                        top: tooltip.y,
                        left: tooltip.x,
                        transition: 'all 0.2s ease-out',
                    }}
                >
                    {tooltip.text}
                </span>
            )}

            <div className="flex flex-wrap items-center justify-center gap-6 py-16">
                {testimonials.map((testimonial, index) => (
                    <div
                        key={index}
                        onMouseMove={(e) => handleMouseMove(e, index)}
                        onMouseLeave={handleMouseLeave}
                        className="relative border border-gray-200 rounded-lg overflow-hidden max-w-sm hover:shadow-lg transition-shadow duration-300"
                    >
                        <div className="flex flex-col items-center justify-center p-8 text-center">
                            <div className="mb-4 text-gray-500">
                                <h3 className="text-lg font-semibold text-gray-900">Very easy to integrate</h3>
                                <p className="my-4 text-sm line-clamp-3">{testimonial.message}</p>
                            </div>
                            <div className="flex items-center justify-center">
                                <img
                                    className="rounded-full w-9 h-9"
                                    src={testimonial.image}
                                    alt={`${testimonial.name} profile`}
                                    aria-label={`${testimonial.name}, ${testimonial.title}`}
                                />
                                <div className="space-y-0.5 font-medium text-left ml-3">
                                    <p>{testimonial.name}</p>
                                    <p className="text-sm text-gray-500">{testimonial.title}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Testimonial;
