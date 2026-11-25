import { cn } from '../../utils/helpers'

export function Skeleton({ className = '', ...rest }) {
  return (
    <div
      className={cn( 'animate-pulse rounded-md bg-slate-200 ', className )}
      {...rest}
    />
  )
}

export function SkeletonCard() {
  return (
    <div className="rounded-xl bg-white border border-slate-200 p-5 space-y-3">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-3 w-2/3" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  )
}

export function SkeletonList({ count = 5 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="h-9 w-9 rounded-full shrink-0" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-2.5 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function PageSkeleton() {
  return (
    <div className="space-y-5 animate-pulse" aria-busy="true" aria-label="Loading section...">
      <div className="flex items-center justify-between">
        <div className="space-y-1.5">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-9 w-28 rounded-lg" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <SkeletonCard key={i} />
        ))}
      </div>
      <div className="rounded-xl border border-slate-200 p-5 bg-white space-y-4">
        <Skeleton className="h-5 w-40" />
        <SkeletonList count={4} />
      </div>
    </div>
  )
}
