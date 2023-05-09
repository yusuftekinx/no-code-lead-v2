import * as React from "react";
import { AppTypes } from "../../utils/types/App/AppTypes";

import { Skeleton, Button } from "antd";
import { useAppDispatch } from "../../app/hooks";
import { deleteApp } from "../../features/Apps/AppSlice";

import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

interface IAppListItemProps {
  app: AppTypes;
}

const AppListItem: React.FunctionComponent<IAppListItemProps> = ({ app }) => {
  const dispatch = useAppDispatch();

  const onDeleteApp = () => {
    dispatch(
      deleteApp({
        appId: app.id,
      })
    );
  };

  return (
    <div className="border-2 relative border-solid border-gray-300 hover:border-gray-400 bg-slate-100 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer p-4 flex flex-col gap-y-3">
      <span
        className="text-white absolute transition-all right-1 top-1 p-2 flex justify-center items-center rounded-full bg-red-400 hover:bg-red-500"
        onClick={onDeleteApp}
      >
        <DeleteOutlined size={36} />
      </span>
      <div className="flex justify-center">
        <Skeleton.Image active={true} style={{ width: "145px" }} />
      </div>
      <div className="text-center">
        <p className="text-xl font-semibold">{app.appName}</p>
        <p className="text-xs text-gray-500 mt-1">
          Bu uygulama <b>{app.pageCount}</b> sayfa içeriyor
        </p>
      </div>
      <div className="flex justify-center gap-2 flex-wrap">
        <Link to={`edit/${app.id}`}>
          <Button type="primary">Güncelle</Button>
        </Link>
        <Link className="inline-block" type="button" to={`preview/${app.id}`}>
          <Button type="default">Incele</Button>
        </Link>
      </div>
    </div>
  );
};

export default AppListItem;
