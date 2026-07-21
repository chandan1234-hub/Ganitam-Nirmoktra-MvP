import React from 'react';

export const AnimatedText = ({ text, className, wordClass }) => {
    return (
        <div className={`flex flex-wrap gap-x-[0.25em] ${className}`}>
            {text.split(" ").map((word, index) => (
                <span key={index} className="overflow-hidden inline-flex pb-1">
                    <span className={`${wordClass} inline-block`}>{word}</span>
                </span>
            ))}
        </div>
    );
};
