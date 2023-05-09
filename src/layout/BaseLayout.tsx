
import * as React from 'react';
import { Outlet } from 'react-router-dom';

interface IBaseLayoutProps {
}

const BaseLayout: React.FunctionComponent<IBaseLayoutProps> = (props) => {
  return <Outlet />;
};

export default BaseLayout;
