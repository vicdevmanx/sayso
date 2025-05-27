import { useMediaQuery } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import clsx from 'clsx';

export const CreatePostSkeleton = () => {
    const isMobile = useMediaQuery('(max-width: 460px)');

    return (
        <div
            className={clsx(
                'bg-[#1c1f26]',
                'border-[1.5px]',
                'border-[#272b34]',
                'rounded-2xl',
                'flex',
                'flex-col',
                'gap-4',
                'p-4',
                isMobile ? 'w-full' : 'w-[600px]'
            )}
        >
            {/* Header: Title input label & input */}
            <div className="flex flex-col gap-1">
                <Skeleton width={80} height={12} baseColor="#2c2f36" highlightColor="#3a3e48" />
                <Skeleton width="100%" height={38} borderRadius={8} baseColor="#2c2f36" highlightColor="#3a3e48" />
            </div>

            {/* Image uploader or preview */}
            <div className="flex flex-col gap-1">
                <Skeleton width={100} height={12} baseColor="#2c2f36" highlightColor="#3a3e48" />
                <Skeleton width="100%" height={160} borderRadius={12} baseColor="#2c2f36" highlightColor="#3a3e48" />
            </div>

            {/* Body content (textarea / rich editor) */}
            <div className="flex flex-col gap-1">
                <Skeleton width={100} height={12} baseColor="#2c2f36" highlightColor="#3a3e48" />
                <Skeleton width="100%" height={120} borderRadius={12} baseColor="#2c2f36" highlightColor="#3a3e48" />
            </div>

            {/* Tag input or categories */}
            <div className="flex flex-col gap-1">
                <Skeleton width={80} height={12} baseColor="#2c2f36" highlightColor="#3a3e48" />
                <div className="flex gap-2">
                    {[1, 2, 3].map((_, i) => (
                        <Skeleton
                            key={i}
                            width={60}
                            height={28}
                            borderRadius={10}
                            baseColor="#2c2f36"
                            highlightColor="#3a3e48"
                        />
                    ))}
                </div>
            </div>

            {/* Submit button */}
            <div className="flex justify-end">
                <Skeleton width={100} height={36} borderRadius={10} baseColor="#2c2f36" highlightColor="#3a3e48" />
            </div>
        </div>
    );
};
