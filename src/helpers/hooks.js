import { useRef, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

export const usePrevious = value => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

export const useIsMobile = () => {
  const [showMobile, setShowMobile] = useState(false);

  useEffect(() => {
    setShowMobile(isMobile);
  }, []);

  return showMobile;
};
