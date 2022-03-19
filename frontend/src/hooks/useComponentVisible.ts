/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';

const useComponentVisible = ({ isVisible }: { isVisible: boolean } = { isVisible: true }) => {
  const [isComponentVisible, setIsComponentVisible] = useState(isVisible);
  const ref = useRef<any>();

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return { ref, isComponentVisible, setIsComponentVisible };
};

export default useComponentVisible;
