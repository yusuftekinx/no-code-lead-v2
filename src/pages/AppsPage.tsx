import * as React from "react";
import { useAppSelector } from "../app/hooks";
import { Button, Empty } from "antd";
import { Link, Outlet } from "react-router-dom";
import AppList from "../components/Apps/AppList";

interface IAppsPageProps {}

const AppsPage: React.FunctionComponent<IAppsPageProps> = (props) => {
  const apps = useAppSelector((state) => state.apps.apps);

  return (
    <div className="flex flex-col">
      {apps.length > 0 ? (
        <div className="flex flex-col gap-y-4">
          <div className="flex md:justify-end justify-center">
            <Button type="primary">
              <Link to={"create"}>Yeni Uygulama</Link>
            </Button>
          </div>
          <AppList apps={apps} />
        </div>
      ) : (
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{ height: 60 }}
          description={<span>Henüz uygulama yok!</span>}
        >
          <Button type="primary">
            <Link to={"create"}>Şimdi Oluştur</Link>
          </Button>
        </Empty>
      )}
      <Outlet />
    </div>
  );
};

export default AppsPage;
