import AllIcons, { IconType } from '@libs/AllIcons';
import { memo } from 'react';
import { IconBaseProps } from 'react-icons';
import dynamic from 'next/dynamic';

export interface IconProps extends IconBaseProps {
  testId?: string | undefined;
  name: IconType | undefined;
  color?: TailwindColorType;
}

const IC = (name: IconType) => {
  return AllIcons[name] as React.ComponentType<IconBaseProps>;
};

const IconComponent = memo<IconProps>(({ testId = 'icon', name, color, ...props }) => {
  if (!name) return null;

  const IconC = IC(name);

  return <IconC color={color} data-testid={`${testId}-${name}`} {...props} />;
});

const Icon = dynamic(() => Promise.resolve(IconComponent), {
  ssr: false,
});

export default Icon;
