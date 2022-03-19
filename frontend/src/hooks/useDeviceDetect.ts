import { useMediaQuery } from 'react-responsive';

const useDeviceDetect = () => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });
  const isBigScreen = useMediaQuery({ minWidth: 1824 });
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });
  const isPortrait = useMediaQuery({ orientation: 'portrait' });
  const isRetina = useMediaQuery({ minResolution: '2dppx' });

  return {
    isDesktopOrLaptop,
    isBigScreen,
    isTabletOrMobile,
    isPortrait,
    isRetina,
  };
};

export default useDeviceDetect;
