import { ChevronLeft } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useNavigate } from 'react-router-dom';

export default function BlogSkeleton() {
  const navigate = useNavigate()
  return (
    <div className='bg-[#0e1116] font-[poppins] text-[#f5f5f5] w-full min-h-screen h-full relative'>
      <div className="min-h-screen flex flex-col m-auto p-2 py-4 w-full max-w-4xl gap-4">
        {/* Header */}
        <div className='flex justify-between w-full items-center'>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <ChevronLeft onClick={() => navigate(-1)} className='size-10 -ml-2 rounded-full transition p-2 hover:bg-[#272b34] active:bg-[#272b34]' />
              <p className='text-white text-xl font-[poppins-bold]'>Post</p>
            </div>
            <div className='flex gap-2 items-center'>
              <Skeleton circle width={48} height={48} baseColor="#1c1f26" highlightColor="#2c2f36" />
              <div className="flex flex-col gap-1">
                <Skeleton width={100} height={14} baseColor="#1c1f26" highlightColor="#2c2f36" />
                <Skeleton width={120} height={12} baseColor="#1c1f26" highlightColor="#2c2f36" />
              </div>
            </div>
          </div>
          <Skeleton width={24} height={24} circle baseColor="#1c1f26" highlightColor="#2c2f36" />
        </div>

        {/* Title */}
        <Skeleton height={30} width="60%" baseColor="#1c1f26" highlightColor="#2c2f36" />

        {/* Tags */}
        <div className="flex gap-2 flex-wrap items-center">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} width={60} height={20} borderRadius={12} baseColor="#1c1f26" highlightColor="#2c2f36" />
          ))}
        </div>

        {/* Content */}
        <Skeleton count={4} height={12} width="100%" baseColor="#1c1f26" highlightColor="#2c2f36" />

        {/* Image */}
        <Skeleton height={300} width="100%" baseColor="#1c1f26" highlightColor="#2c2f36" />

        {/* Action Buttons */}
        <div className='w-full flex items-center gap-4 bg-[#1c1f26] p-2 rounded-lg'>
          <div className='flex gap-2 items-center'>
            <Skeleton circle width={24} height={24} baseColor="#272b34" highlightColor="#2c2f36" />
            <Skeleton width={30} height={20} baseColor="#1c1f26" highlightColor="#2c2f36" />
          </div>
          <Skeleton width={24} height={24} circle baseColor="#1c1f26" highlightColor="#2c2f36" />
          <Skeleton width={24} height={24} circle baseColor="#1c1f26" highlightColor="#2c2f36" />
        </div>
      </div>
    </div>
  );
}
