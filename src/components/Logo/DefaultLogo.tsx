


import * as React from 'react';

import Logo from '../../static/app-logo.webp'
import { Link } from 'react-router-dom';


const DefaultLogo: React.FunctionComponent = (props) => {
  return <Link to={"/"}>
    <img src={Logo} className='w-full' />
  </Link>
};

export default DefaultLogo;
