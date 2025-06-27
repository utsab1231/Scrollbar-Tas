'use client';

import React, { useState, useRef, useEffect } from 'react';

const ScrollableComponent = () => {
    const [elements, setElements] = useState([1]); // Start with element 1
    const [isLoading, setIsLoading] = useState(false);
    const [hasScrolledTo20, setHasScrolledTo20] = useState(false); // Track scroll to 20
    const [hasScrolledTo31, setHasScrolledTo31] = useState(false); // Track scroll to 31
    const [isFinished, setIsFinished] = useState(false);
    const finishScrollable:number = Number(process.env.SCROLLBAR_FINISH) ?? 50;
    const HorizontalScrollbarLower:number =  Number(process.env.HORIZONTAL_SCROLLBAR_LOWER) ?? 21;
    const HorizontalScrollbarUpper:number =  Number(process.env.HORIZONTAL_SCROLLBAR_UPPER) ?? 30;

    const containerRef = useRef(null);
    const lastElementRef = useRef(null);

    // Determine if horizontal scrolling is needed based on the last number
    const lastNumber = elements[elements.length - 1];
    const isHorizontal = lastNumber >= HorizontalScrollbarLower && lastNumber <= HorizontalScrollbarUpper;


    const fetchData = async () => {
        setIsLoading(true);
        try {
            // Simulate API call with a delay
            await new Promise(resolve => setTimeout(resolve, 500));
            // Mock API response: next number in sequence
            const nextNumber = elements.length + 1;

            if(nextNumber <=finishScrollable) {
                setElements(prev => [...prev, nextNumber]);
            }
            else{
                setIsFinished(true);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Scroll listener: triggers when user scrolls near bottom (vertical) or right (horizontal)
    useEffect(() => {
        const container = containerRef.current;

        const handleScroll = () => {
            if (!container || isLoading) return;

            const { scrollTop, scrollHeight, clientHeight, scrollLeft, scrollWidth, clientWidth } = container;

            // Use scrollLeft for horizontal, scrollTop for vertical
            const isNearEnd = isHorizontal
                ? scrollLeft + clientWidth >= scrollWidth - 100
                : scrollTop + clientHeight >= scrollHeight - 100;


            if (isNearEnd && !isFinished) {
                fetchData();
            }
        };

        container?.addEventListener('scroll', handleScroll);
        return () => container?.removeEventListener('scroll', handleScroll);
    }, [isLoading, isHorizontal]);

    // Extra hook: trigger fetch if at end and scroll to newest element only at 20 or 31
    useEffect(() => {
        const container = containerRef.current;
        if (!container || isLoading) return;

        const { scrollTop, scrollHeight, clientHeight, scrollLeft, scrollWidth, clientWidth } = container;
        const isAtEnd = isHorizontal
            ? scrollLeft + clientWidth >= scrollWidth - 5
            : scrollTop + clientHeight >= scrollHeight - 5;

        // Scroll to newest element only at number 20 (vertical to horizontal) or 31 (horizontal to vertical)
        if (lastElementRef.current && ((lastNumber === 20 && !hasScrolledTo20) || (lastNumber === 31 && !hasScrolledTo31))) {
            const scrollOptions = { behavior: 'smooth' };
            if (isHorizontal) {
                container.scrollTo({ left: lastElementRef.current.offsetLeft, ...scrollOptions });
                if (lastNumber === 20) setHasScrolledTo20(true);
            } else {
                container.scrollTo({ top: lastElementRef.current.offsetTop, ...scrollOptions });
                if (lastNumber === 31) setHasScrolledTo31(true);
            }
        }

        if (isAtEnd) {
            fetchData();
        }
    }, [elements, isHorizontal, hasScrolledTo20, hasScrolledTo31]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div
                ref={containerRef}
                className={`w-3/4 h-48 bg-white rounded-lg shadow-lg border border-gray-200 ${isHorizontal ? 'overflow-x-auto overflow-y-hidden' : 'overflow-y-auto'}`}
            >
                <div
                    className={`flex ${isHorizontal ? 'flex-row items-center justify-start space-x-4 min-w-[300px]' : 'flex-col items-center justify-start space-y-4 min-h-[300px]'}`}
                >
                    {elements.map((number, index) => (
                        <div
                            key={index}
                            ref={index === elements.length - 1 ? lastElementRef : null}
                            className={`${isHorizontal ? 'h-[90%] w-32' : 'w-[90%] h-32'} bg-blue-500 rounded-lg flex items-center justify-center text-white text-4xl font-bold flex-shrink-0`}
                        >
                            {number}
                        </div>
                    ))}
                    {isLoading && (
                        <div
                            className={`${isHorizontal ? 'h-[90%] w-32' : 'w-[90%] h-32'} bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0`}
                        >
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    )}
                    {isFinished && (

                            <div className="w-[90%] h-32  bg-blue-500 rounded-lg flex items-center justify-center text-white text-4xl font-bold flex-shrink-0 p-2 mb-2"><div>Finished</div></div>

                    )}

                </div>
            </div>
        </div>
    );
};

export default ScrollableComponent;