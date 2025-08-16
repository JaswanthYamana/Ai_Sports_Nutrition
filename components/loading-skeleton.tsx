"use client"

export function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="space-y-4">
        <div className="loading-skeleton h-8 w-64 rounded-lg"></div>
        <div className="loading-skeleton h-4 w-96 rounded"></div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="border rounded-lg p-6">
            <div className="loading-skeleton h-8 w-8 rounded-full mx-auto mb-2"></div>
            <div className="loading-skeleton h-6 w-16 rounded mx-auto mb-2"></div>
            <div className="loading-skeleton h-4 w-20 rounded mx-auto"></div>
          </div>
        ))}
      </div>

      {/* Cards Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border rounded-lg p-6">
            <div className="loading-skeleton h-48 w-full rounded-lg mb-4"></div>
            <div className="loading-skeleton h-6 w-3/4 rounded mb-2"></div>
            <div className="loading-skeleton h-4 w-full rounded mb-2"></div>
            <div className="loading-skeleton h-4 w-2/3 rounded mb-4"></div>
            <div className="loading-skeleton h-10 w-full rounded"></div>
          </div>
        ))}
      </div>
    </div>
  )
}
