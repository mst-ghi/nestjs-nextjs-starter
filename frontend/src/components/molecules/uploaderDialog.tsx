/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import dynamic from 'next/dynamic';
import useDeviceDetect from '@hooks/useDeviceDetect';
import Button from '@components/atoms/button';
import Dialog from '@components/atoms/dialog';
import Icon from '@components/atoms/icon';

interface AppUploaderDialogProps {
  open?: boolean;
  title?: string;
  className?: string;
  maxSize?: number;
  aspect?: number;
  accept?: 'video/*' | 'image/*' | 'image/*, video/*';
  isAbleToDrop?: boolean;
  onCLose?: () => void;
  onChangeMedia?: (_media: any) => void;
  onDeleteMedia?: () => void;
  onError?: (message?: string) => void;
}

const UploaderDialogComponent = memo<AppUploaderDialogProps>(
  ({
    open = false,
    title = 'Uploader',
    accept = 'image/*, video/*',
    isAbleToDrop = true,

    // 500kb
    maxSize = 500000,

    aspect = 1,
    className,
    onCLose,
    onError,
    onChangeMedia,
    onDeleteMedia,
  }) => {
    const { isTabletOrMobile } = useDeviceDetect();

    const [selectedFile, setSelectFile] = useState<File>();
    const [fileSize, setFileSize] = useState<number>(0);
    const [hasError, setHasError] = useState<string>();
    const [isDragging, setIsDragging] = useState(false);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    const validateMediaType = (f: File) => {
      const acceptTypes = accept.replaceAll(' ', '').split(',');

      if (maxSize && f.size > maxSize) {
        setHasError('The selected file size is too large');
        return false;
      }

      const fileType: string = f.type;

      for (let index = 0; index < acceptTypes.length; index += 1) {
        if (fileType.match(acceptTypes[index])) {
          setHasError(undefined);
          if (onError) {
            onError(undefined);
          }
          return true;
        }
      }

      setHasError('The selected file is not valid');
      return false;
    };

    const onSelectMedia = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        if (validateMediaType(e.target.files[0])) {
          setFileSize(e.target.files[0].size);
          setSelectFile(e.target.files[0]);
        }
      }
    };

    const onDropMedia = (e: React.DragEvent<HTMLDivElement>) => {
      if (isAbleToDrop && e.dataTransfer?.files && e.dataTransfer?.files?.length > 0) {
        if (validateMediaType(e.dataTransfer.files[0])) {
          setFileSize(e.dataTransfer.files[0].size);
          setSelectFile(e.dataTransfer.files[0]);
        }
      }
    };

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
      console.log(croppedArea, croppedAreaPixels);
    }, []);

    return (
      <Dialog
        open={open}
        width={isTabletOrMobile ? 320 : 460}
        onClose={() => {
          if (onCLose) onCLose();
        }}
      >
        <div className={['text-center', className].join(' ')}>
          <span>{title}</span>

          {!selectedFile && (
            <div
              className={['my-3 p-2 h-40 border-2 rounded-lg', 'hover:bg-gray-50'].join(' ')}
              onClick={() => {}}
            >
              <label
                htmlFor="upload-photo"
                className="flex flex-col justify-center items-center h-full w-full cursor-pointer"
              >
                <Icon name="camera-outline" size={56} color="gray" />
                <span className="text-gray-500">Click here to select image</span>
              </label>

              <input
                type="file"
                name="photo"
                id="upload-photo"
                accept={accept}
                onChange={(e) => {
                  e.preventDefault();
                  onSelectMedia(e);
                }}
                className="absolute cursor-pointer hidden"
                hidden
              />
            </div>
          )}

          {selectedFile && (
            <div className="mt-4 flex flex-col justify-center items-center space-y-2">
              <Cropper
                image="/images/temp.jpg"
                crop={crop}
                zoom={zoom}
                aspect={aspect}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />

              <Button
                icon={{ name: 'upload-outline', size: 30, className: 'mr-2' }}
                wide
                color="info"
                className="h-10"
              >
                Upload
              </Button>
            </div>
          )}
        </div>
      </Dialog>
    );
  }
);

const UploaderDialog = dynamic(() => Promise.resolve(UploaderDialogComponent));

export default UploaderDialog;
