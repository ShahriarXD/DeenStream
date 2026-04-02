export default function SkeletonCard({ lines = 3 }: { lines?: number }) {
  return (
    <div className="card-glass p-6 space-y-4">
      <div className="h-4 w-1/3 rounded-lg bg-gradient-to-r from-white/5 via-white/10 to-white/5 animate-shimmer" />
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-3 rounded-lg bg-gradient-to-r from-white/5 via-white/10 to-white/5 animate-shimmer"
          style={{ width: `${85 - i * 15}%`, animationDelay: `${i * 150}ms` }}
        />
      ))}
    </div>
  );
}
