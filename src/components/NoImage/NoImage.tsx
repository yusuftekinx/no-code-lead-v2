

import * as React from 'react';

interface INoImageProps {
    children?: JSX.Element
}

const NoImage: React.FunctionComponent<INoImageProps> = ({children}) => {
  return <div className='relative w-full h-full bg-gray-300 rounded-l-lg animate-pulse'>
    {children}
  </div>;
};

export default NoImage;
