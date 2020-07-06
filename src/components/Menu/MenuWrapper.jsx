import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import SimpleBar from 'simplebar-react';
import classNames from 'classnames';
import { useEffect } from 'react';

const MenuWrapper = ({ children, isMenuOpen }) => {
  const [showMobile, setShowMobile] = useState(false);

  useEffect(() => {
    setShowMobile(isMobile);
  }, []);

  if (showMobile) {
    return <div className={classNames('menu', isMenuOpen && '--open')}>{children}</div>;
  }

  return (
    <SimpleBar forceVisible={true} autoHide={false} className={classNames('menu', isMenuOpen && '--open')}>
      {children}
    </SimpleBar>
  );
};

export default MenuWrapper;
