import React, { useState } from "react";
import { AppstoreAddOutlined, UserOutlined } from "@ant-design/icons";

import { Divider } from "antd";

import { Layout, Menu, Button, theme } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import { MenuTypes } from "../utils/types/MenuTypes";
import DefaultLogo from "../components/Logo/DefaultLogo";

const { Sider, Content } = Layout;

const SidebarLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) setCollapsed(true);
      else setCollapsed(false);
    }

    window.addEventListener("resize", handleResize);
  });

  const menus: MenuTypes[] = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: (
        <Link className="block" to={"/dashboard"}>
          Dashboard
        </Link>
      ),
      title: "Panel",
      description: "Yönetim Paneli",
      path: "/dashboard",
    },
    {
      key: "2",
      icon: <AppstoreAddOutlined />,
      label: (
        <Link className="block" to={"/apps"}>
          Apps
        </Link>
      ),
      path: "/apps",
      title: "Uygulamalar",
      description: "Oluşturduğunuz uygulamalar aşağıda listelenmiştir",
    },
  ];

  const [activeMenu, setActiveMenu] = React.useState<MenuTypes | null>(null);
  const location = useLocation();

  React.useEffect(() => {
    const findPath = menus.find((menu) =>
      menu.path.includes(location.pathname)
    );

    if (findPath) setActiveMenu(findPath);
  }, [location.pathname]);

  return (
    <Layout className="w-full h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="md:flex hidden w-48 justify-center p-4">
          <DefaultLogo />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[activeMenu ? activeMenu.key : "0"]}
          items={menus.map((menu, index) => {
            return {
              key: menu.key,
              label: menu.label,
              icon: menu.icon,
              onClick: () => {
                setActiveMenu(menus[index]);
              },
            };
          })}
        />
      </Sider>
      <Content className="p-6 h-screen bg-white shadow-md">
        {activeMenu ? (
          <div className="flex flex-col gap-y-3">
            <h2 className="md:text-3xl text-xl font-bold text-slate-800 flex gap-x-2">
              {activeMenu.title}
            </h2>
            <span className="text-slate-600">{activeMenu.description}</span>
          </div>
        ) : null}
        <Outlet />
      </Content>
    </Layout>
  );
};

export default SidebarLayout;
