export default function SkeletonCard({ lines = 3 }: { lines?: number }) {
  return (
    <div className="card-elevated p-5 space-y-3">
      <div className="h-3.5 w-1/3 rounded-lg bg-secondary animate-pulse" />
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-3 rounded-lg bg-secondary/70 animate-pulse"
          style={{ width: `${85 - i * 15}%`, animationDelay: `${i * 100}ms` }}
        />
      ))}
    </div>
  );
}
