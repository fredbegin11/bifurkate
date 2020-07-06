import React from 'react';
import { isMobile } from 'react-device-detect';
import SimpleBar from 'simplebar-react';
import classNames from 'classnames';

const MenuWrapper = ({ children, isMenuOpen }) => {
  if (isMobile) {
    return <div className={classNames('menu', isMenuOpen && '--open')}>{children}</div>;
  }

  return (
    <SimpleBar forceVisible={true} autoHide={false} className={classNames('menu', isMenuOpen && '--open')}>
      {children}
    </SimpleBar>
  );
};

export default MenuWrapper;
