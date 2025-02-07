import { Skeleton } from '../common/skeleton';

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 my-4">
      <Skeleton className="h-[212px] w-[510px] rounded-xl" />
    </div>
  );
}
