import React from 'react';
import SimpleBar from 'simplebar-react';
import classNames from 'classnames';

const MenuWrapper = ({ children, isMenuOpen }) => {
  return (
    <SimpleBar forceVisible={true} autoHide={false} className={classNames('menu', isMenuOpen && '--open')}>
      {children}
    </SimpleBar>
  );
};

export default MenuWrapper;
