interface SkeletonCardProps {
  viewMode: 'grid' | 'list'
}

export default function SkeletonCard({ viewMode }: SkeletonCardProps) {
  return (
    <div
      className={`h-full group border rounded-2xl overflow-hidden shadow-sm bg-white animate-pulse ${
        viewMode === 'list' ? 'flex' : 'flex flex-col'
      }`}
    >
      <div
        className={`${
          viewMode === 'list' ? 'w-1/3 h-48' : 'w-full aspect-square'
        } bg-gray-200`}
      />

      <div
        className={`flex flex-col gap-3 p-4 ${
          viewMode === 'list' ? 'w-2/3' : 'w-full'
        }`}
      >
        <div className="h-4 w-1/2 bg-gray-300 rounded" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-3/4 bg-gray-200 rounded" />
        </div>
        <div className="space-y-1">
          <div className="h-4 w-1/3 bg-gray-200 rounded" />
          <div className="h-4 w-2/3 bg-gray-200 rounded" />
        </div>
        <div className="mt-auto flex justify-between items-center">
          <div className="h-6 w-16 bg-gray-300 rounded" />
          <div className="h-8 w-24 bg-gray-300 rounded-full" />
        </div>
      </div>
    </div>
  )
}
