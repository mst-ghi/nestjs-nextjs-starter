import { Dialog as HDialog, Transition } from '@headlessui/react';
import { Fragment, memo } from 'react';
import dynamic from 'next/dynamic';
import Button from './button';

interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  title?: string | undefined;
  description?: string | undefined;
  wrapperClass?: string | undefined;
  width?: number;
  onClose?: () => void;
}

const DialogComponent = memo<DialogProps>(
  ({
    open,
    title,
    description,
    width = 460,
    onClose,
    className,
    wrapperClass,
    children,
    ...props
  }) => {
    const onCloseDialog = () => {
      if (onClose) {
        onClose();
      }
    };

    return (
      <Transition appear show={open} as={Fragment}>
        <HDialog
          className={[
            'dialog absolute top-32 overflow-y-auto shadow-xl bg-base-100 p-4 rounded-xl',
            wrapperClass,
          ].join(' ')}
          onClose={onCloseDialog}
          {...props}
          style={{ width, left: `calc(50vw - (${width}px / 2))` }}
        >
          <div className="relative">
            <Button
              circle
              glass
              icon={{ name: 'close', size: 16, color: 'gray' }}
              size="xs"
              className="h-6 w-6 absolute -right-2 -top-2 border-gray-300"
              onClick={onCloseDialog}
            />
          </div>
          {title && <HDialog.Title>{title}</HDialog.Title>}
          {description && <HDialog.Description>{description}</HDialog.Description>}
          <div className={className}>{children}</div>
        </HDialog>
      </Transition>
    );
  }
);

const Dialog = dynamic(() => Promise.resolve(DialogComponent), {
  ssr: false,
});

export default Dialog;
