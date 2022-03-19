import { memo } from 'react';
import dynamic from 'next/dynamic';
import useAlert from '@hooks/useAlert';
import useDeviceDetect from '@hooks/useDeviceDetect';
import Button from '@components/atoms/button';
import Dialog from '@components/atoms/dialog';

interface AppConfirmDialogProps {
  children?: React.ReactChild;
  btnHeight?: number;
  className?: string;
}

const ConfirmDialogComponent = memo<AppConfirmDialogProps>(({ children, className }) => {
  const { isTabletOrMobile } = useDeviceDetect();
  const { onAccepted, onRejected, confirmState, closeConfirm } = useAlert();

  return (
    <Dialog
      data-testid="test-confirm-dialog"
      open={confirmState.isConfirmModalOpen}
      width={isTabletOrMobile ? 320 : 460}
      onClose={() => {
        closeConfirm();
        onRejected();
      }}
    >
      <div className="text-center">
        {confirmState.title && (
          <h2
            data-testid="test-confirm-dialog-title"
            className="text-xl font-bold leading-6 text-zinc-600 mt-4 pb-0"
          >
            {confirmState.title}
          </h2>
        )}

        {confirmState.message && (
          <h3
            data-testid="test-confirm-dialog-message"
            className="font-medium text-xl text-gray-500 mt-5 pb-0"
          >
            {confirmState.message}
          </h3>
        )}

        <div
          className={['max-h-screen overflow-auto mt-4', className].join(' ')}
          style={{ maxHeight: '80vh' }}
        >
          {children}
        </div>

        <div className="flex flex-row space-x-4 m-4 justify-center">
          <Button
            data-testid="test-confirm-dialog-reject-btn"
            className="w-1/2 h-10 btn-error"
            size="sm"
            onClick={onRejected}
          >
            {confirmState.rejectText}!
          </Button>

          <Button
            data-testid="test-confirm-dialog-accept-btn"
            className="w-1/2 h-10 btn-primary"
            size="sm"
            onClick={onAccepted}
          >
            {confirmState.acceptText}
          </Button>
        </div>
      </div>
    </Dialog>
  );
});

const ConfirmDialog = dynamic(() => Promise.resolve(ConfirmDialogComponent));

export default ConfirmDialog;
