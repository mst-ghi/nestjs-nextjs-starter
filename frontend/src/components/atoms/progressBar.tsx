import { memo } from 'react';
import dynamic from 'next/dynamic';

const Colors = {
  primary: 'progress-primary',
  secondary: 'progress-secondary',
  accent: 'progress-accent',
  info: 'progress-info',
  success: 'progress-success',
  warning: 'progress-warning',
  error: 'progress-error',
};

interface ProgressBarProps extends React.HTMLAttributes<HTMLProgressElement> {
  color?: keyof typeof Colors;
  value?: number;
  max?: number;
}

const ProgressBarComponent = memo<ProgressBarProps>(
  ({ color, value = 0, max = 100, className, ...props }) => {
    return (
      <progress
        className={['progress', color && Colors[color], className].join(' ').replace(/\s+/g, ' ')}
        value={value}
        max={max}
        {...props}
      />
    );
  }
);

const ProgressBar = dynamic(() => Promise.resolve(ProgressBarComponent), {
  ssr: false,
});

export default ProgressBar;
