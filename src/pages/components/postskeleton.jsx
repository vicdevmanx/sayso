import { useMediaQuery } from '@mui/material';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import clsx from 'clsx';


export const PostSkeleton = ({ review = false }) => {
    const isMobile = useMediaQuery('(max-width: 460px)');

    return (
        <div className={clsx(
            'bg-[#1c1f26]',
            'border-[1.5px]',
            'border-[#272b34]',
            'rounded-2xl',
            'flex',
            'flex-col',
            'gap-2.5',
            'pb-2.5',
            isMobile ? 'w-full' : 'w-78',
            review ? 'w-92' : ''
        )}>
            <div className='p-3 pb-0 flex justify-between'>
                <div className='flex gap-2 items-center'>
                    <Skeleton circle width={36} height={36} baseColor="#2c2f36" highlightColor="#3a3e48" />
                    <div className='flex flex-col'>
                        <Skeleton width={100} height={12} baseColor="#2c2f36" highlightColor="#3a3e48" />
                        <Skeleton width={60} height={10} baseColor="#2c2f36" highlightColor="#3a3e48" />
                    </div>
                </div>
                <Skeleton width={20} height={20} baseColor="#2c2f36" highlightColor="#3a3e48" />
            </div>

            <div className='p-3 pb-0 pt-0 flex flex-col gap-2'>
                <Skeleton width="90%" height={20} baseColor="#2c2f36" highlightColor="#3a3e48" />
                {review && <Skeleton width="100%" height={40} baseColor="#2c2f36" highlightColor="#3a3e48" />}
                <div className='flex gap-2'>
                    {[1, 2, 3].map((_, i) => (
                        <Skeleton key={i} width={50} height={20} borderRadius={10} baseColor="#2c2f36" highlightColor="#3a3e48" />
                    ))}
                </div>
            </div>

            <div className='p-2 pt-0 pb-0'>
                <Skeleton height={review ? 160 : isMobile ? 180 : 140} baseColor="#2c2f36" highlightColor="#3a3e48" />
            </div>

            <div className='px-2 flex gap-4'>
                {[1, 2, 3].map((_, i) => (
                    <Skeleton key={i} width={60} height={30} borderRadius={12} baseColor="#2c2f36" highlightColor="#3a3e48" />
                ))}
            </div>
        </div>
    )
}
