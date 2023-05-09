
import * as React from 'react';
import {Button} from 'antd'
import { Link } from 'react-router-dom';
interface INotFoundPageProps {
}

const NotFoundPage: React.FunctionComponent<INotFoundPageProps> = (props) => {
  return <div className='w-full h-screen flex flex-col justify-center items-center gap-y-3'>
    <span className='text-lg font-bold'>
      Sayfa bulunamadı :(

    </span>
    <Button type='primary'> 
        <Link to={"/dashboard"}>
          Anasayfa'ya Git
        </Link>
    </Button>
  </div>;
};

export default NotFoundPage;
