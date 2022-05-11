import { memo } from 'react';
import { toTitleCase } from '@utils/string';
import useApp from '@hooks/useApp';
import useDeviceDetect from '@hooks/useDeviceDetect';
import Button from '@components/atoms/button';
import Dialog from '@components/atoms/dialog';

interface SettingsDialogProps {
  children?: React.ReactChild;
  btnHeight?: number;
  className?: string;
}

const SettingsDialog = memo<SettingsDialogProps>(({ className }) => {
  const { isTabletOrMobile } = useDeviceDetect();
  const {
    isShowSettingDialog,
    setIsShowSettingDialog,
    themes,
    theme,
    setTheme,
    version,
    direction,
    setDirection,
  } = useApp();

  const renderThemesButton = () => {
    return themes.map((el, index) => {
      return (
        <Button
          key={`${el}-${index}`}
          size="xs"
          className={['m-1', isTabletOrMobile ? 'w-24' : 'w-28'].join(' ')}
          color={el === theme ? 'primary' : 'info'}
          onClick={() => setTheme(el)}
        >
          {toTitleCase(el)}
        </Button>
      );
    });
  };

  const renderDirection = () => {
    return ['ltr', 'rtl'].map((el, index) => {
      return (
        <Button
          key={`${el}-${index}`}
          size="xs"
          className="w-28 m-1"
          color={direction === el ? 'primary' : 'info'}
          onClick={() => setDirection(el as 'ltr' | 'rtl')}
        >
          {toTitleCase(el)}
        </Button>
      );
    });
  };

  return (
    <Dialog
      open={isShowSettingDialog || false}
      width={isTabletOrMobile ? 390 : 840}
      wrapperClass="border-[1px] border-gray-200"
      onClose={() => {
        setIsShowSettingDialog(false);
      }}
    >
      <div className="text-center pb-4">
        <h2 className="text-xl font-bold leading-6 text-zinc-600 mt-4 mb-6 pb-0">
          App Settings <span className="font-light text-sm">({version})</span>
        </h2>

        <div className="divider">
          <span>Themes</span>
        </div>
        <div
          className={[
            'flex flex-wrap justify-center items-stretch overflow-auto mt-4',
            className,
          ].join(' ')}
        >
          {renderThemesButton()}
        </div>

        <div className="divider">
          <span>Direction</span>
        </div>
        <div
          className={[
            'flex flex-wrap justify-center items-stretch overflow-auto mt-4',
            className,
          ].join(' ')}
        >
          {renderDirection()}
        </div>
      </div>
    </Dialog>
  );
});

export default SettingsDialog;
