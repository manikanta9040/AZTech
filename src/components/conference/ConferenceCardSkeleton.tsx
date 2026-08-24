interface ConferenceCardSkeletonProps {
  count?: number;
  className?: string;
}

export function ConferenceCardSkeleton({ count = 6, className = '' }: ConferenceCardSkeletonProps) {
  return (
    <div className={`az-conference-grid ${className}`} aria-busy="true" aria-label="Loading conferences">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="az-card az-conference-card az-skeleton-card">
          <div className="az-skeleton az-skeleton--image" />
          <div className="az-conference-card__body">
            <div className="az-skeleton az-skeleton--title" />
            <div className="az-skeleton az-skeleton--text" />
            <div className="az-skeleton az-skeleton--text az-skeleton--short" />
            <div className="az-skeleton-meta">
              <div className="az-skeleton az-skeleton--meta" />
              <div className="az-skeleton az-skeleton--meta" />
            </div>
          </div>
          <div className="az-conference-card__footer">
            <div className="az-skeleton az-skeleton--button" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ConferenceCardSkeleton;
