interface ProgressBarProps {
  percentage: number;
  className?: string;
}

export const ProgressBar = ({ percentage, className = '' }: ProgressBarProps) => {
  return (
    <div className={`progress-bar ${className}`}>
      <div 
        className="progress-fill"
        style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
      />
    </div>
  );
};