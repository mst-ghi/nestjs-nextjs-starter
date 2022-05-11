import React from 'react';
import dynamic from 'next/dynamic';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}
interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardHeader = React.memo<CardHeaderProps>(({ children, ...props }) => {
  return <div {...props}>{children}</div>;
});

export const CardFooter = React.memo<CardFooterProps>(({ children, className, ...props }) => {
  return (
    <div className={['justify-end card-actions', className].join(' ')} {...props}>
      {children}
    </div>
  );
});

export const CardBody = React.memo<CardBodyProps>(({ children, className, ...props }) => {
  return (
    <div className={['card-body', className].join(' ')} {...props}>
      {children}
    </div>
  );
});

const CardComponent = React.memo<CardProps>(({ className, children }) => {
  return (
    <div className={['card bg-base-100 p-4 rounded-lg w-full', className].join(' ')}>
      {children}
    </div>
  );
});

const Card = dynamic(() => Promise.resolve(CardComponent));

export default Card;
