import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { getAppById } from "../../app/AppHooks/AppHooks";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Alert, Checkbox, Divider } from "antd";
import EditPages from "../../components/Apps/Edit/EditPages";
import { contactPageManage } from "../../features/Apps/AppSlice";

interface IEditAppPageProps {}

const EditAppPage: React.FunctionComponent<IEditAppPageProps> = (props) => {
  const { appId } = useParams();
  const app = useAppSelector(getAppById(appId ?? ""));

  const dispatch = useAppDispatch();

  const updatedContactPage = (e: any) => {
    if (!app) return;
    const status = e.target.checked;

    if (status) {
      dispatch(
        contactPageManage({
          appId: app.id,
        })
      );
    } else {
      dispatch(
        contactPageManage({
          appId: app.id,
          remove: true,
        })
      );
    }
  };

  if (app) {
    return (
      <div className="w-full h-full">
        <div className="flex flex-col ">
          <p className="text-2xl">
            <b className="p-2 bg-red-700 text-white rounded-lg">
              {app.appName}
            </b>{" "}
            uygulamasını güncelleyin
          </p>
          <Divider />
          <div className="flex justify-end pb-2">
            <Checkbox defaultChecked={app.pages.find((page) => page.contact) ? true : false} onChange={updatedContactPage}>
              İletişim Sayfası
            </Checkbox>
          </div>
        </div>
        <div className="w-full flex h-5/6 bg-slate-100 shadow-sm rounded-lg relative">
          <EditPages pages={app.pages} />
        </div>
      </div>
    );
  } else {
    return (
      <Alert
        message={
          <div>
            Uygulama bulunamadı.{" "}
            <Link to={"/apps"}>
              <b>Geri dön</b>
            </Link>
          </div>
        }
        type="error"
      />
    );
  }
};

export default EditAppPage;
