---
to: <%= absPath %>/<%= fileName %>.tsx
---
import dynamic from 'next/dynamic';

export interface <%= name %>Props extends React.HTMLAttributes<HTMLDivElement> {
  //
}

export const <%= name %>Component = ({ children, ...props }: <%= name %>Props) => {
  return (
    <div
      data-testid="test-component-<%= fileName %>"
      {...props}
    >
      {children}
    </div>
  );
}

const <%= name %> = dynamic(() => Promise.resolve(<%= name %>Component));
export default <%= name %>;