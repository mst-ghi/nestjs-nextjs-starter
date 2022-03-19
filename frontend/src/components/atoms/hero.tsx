import { memo } from 'react';
import dynamic from 'next/dynamic';

interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
  contentClass?: string | undefined;
}

const HeroComponent = memo<HeroProps>(({ contentClass, children, className, ...props }) => {
  return (
    <div className={['hero bg-base-100 rounded-xl', className].join(' ')} {...props}>
      <div className={['text-center hero-content', contentClass].join(' ')}>{children}</div>
    </div>
  );
});

const Hero = dynamic(() => Promise.resolve(HeroComponent), {
  ssr: false,
});

export default Hero;
