import React from 'react';

interface SkeletonProps {
    className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => {
    return (
        <div
            className={`animate-pulse bg-gray-200 rounded-md ${className}`}
            style={{ minHeight: '20px' }}
        />
    );
}; 