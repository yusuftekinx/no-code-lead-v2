
import * as React from 'react';
import { AppTypes } from '../../utils/types/App/AppTypes';
import AppListItem from './AppListItem';

interface IAppListProps {
    apps: AppTypes[]
}

const AppList: React.FunctionComponent<IAppListProps> = ({apps}) => {
  return <div className='grid grid-cols-1 xl:grid-cols-6 lg:grid-cols-5 sm:grid-cols-3 gap-5'>
    {apps.map((app,_) => {
        return <AppListItem key={_} app={app} />
    })}
  </div>;
};

export default AppList;
