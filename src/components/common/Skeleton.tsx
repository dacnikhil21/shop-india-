import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'rect' | 'circle' | 'text';
  theme?: 'light' | 'dark';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rect',
  theme = 'light'
}) => {
  const shimmerClass = theme === 'dark' ? 'skeleton-shimmer-dark' : 'skeleton-shimmer';
  const shapeClass = variant === 'circle' ? 'rounded-full' : variant === 'text' ? 'rounded h-4' : 'rounded-md';

  return (
    <div className={`bg-gray-200 dark:bg-zinc-800 ${shimmerClass} ${shapeClass} ${className}`} />
  );
};

export const ProductCardSkeleton: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme = 'light' }) => {
  const isDark = theme === 'dark';
  return (
    <div className={`p-4 rounded border ${isDark ? 'border-zinc-800 bg-zinc-900' : 'border-gray-200 bg-white'} flex flex-col gap-3 h-full`}>
      <Skeleton className="w-full aspect-square" theme={theme} />
      <Skeleton className="w-2/3 h-5" variant="text" theme={theme} />
      <Skeleton className="w-1/2 h-4" variant="text" theme={theme} />
      <div className="flex items-center gap-2 mt-auto">
        <Skeleton className="w-1/4 h-5" variant="text" theme={theme} />
        <Skeleton className="w-1/4 h-4" variant="text" theme={theme} />
      </div>
    </div>
  );
};
