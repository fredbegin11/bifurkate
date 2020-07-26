import React from 'react';
import SimpleBar from 'simplebar-react';
import classNames from 'classnames';
import { useIsMobile } from '../../helpers/hooks';

const MenuWrapper = ({ children, isMenuOpen }) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <div className={classNames('menu', isMenuOpen && '--open')}>{children}</div>;
  }

  return (
    <SimpleBar forceVisible autoHide={false} className={classNames('menu', isMenuOpen && '--open')}>
      {children}
    </SimpleBar>
  );
};

export default MenuWrapper;
