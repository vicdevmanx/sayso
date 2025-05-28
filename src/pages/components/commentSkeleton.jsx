import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function CommentSkeleton() {
  return (
    <div className='flex flex-col gap-2 font-[poppins] text-[13px] w-full'>
      <div className='border-2 border-[#272b34] rounded-lg p-2 flex gap-2 w-full'>
        {/* Profile image */}
        <div className='w-8 h-8 min-w-8 rounded-full overflow-hidden flex items-center'>
          <Skeleton circle width={32} height={32} baseColor="#1c1f26" highlightColor="#2c2f36" />
        </div>

        {/* Comment content */}
        <div className='flex flex-col gap-1 w-full'>
          {/* Username */}
          <Skeleton width={100} height={12} baseColor="#1c1f26" highlightColor="#2c2f36" />

          {/* Comment text */}
          <Skeleton count={2} height={10} baseColor="#1c1f26" highlightColor="#2c2f36" />

          {/* Timestamp or Actions */}
          <Skeleton width={80} height={10} baseColor="#1c1f26" highlightColor="#2c2f36" />
        </div>
      </div>
    </div>
  );
}
