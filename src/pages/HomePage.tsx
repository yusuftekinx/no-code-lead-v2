import * as React from "react";
import { Button } from "antd";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Link } from "react-router-dom";
import { logout } from "../features/Auth/AuthSlice";

interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth);

  const onHandleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className="w-full h-screen flex justify-center flex-col items-center gap-y-4">
      <p className="text-lg font-semibold">
        {user.isLoggedIn ? user.user?.email : ""}
      </p>
      {user.isLoggedIn ? (
        <div className="flex gap-x-2">
          <Button type="primary">
            <Link to={"/dashboard"}>Anasayfa'ya Git</Link>
          </Button>
          <Button  onClick={onHandleLogout}  type="primary" danger>
            Çıkış Yap
          </Button>
        </div>
      ) : (
        <Button type="primary">
          <Link to={"/login"}>Şimdi Giriş Yap</Link>
        </Button>
      )}
    </div>
  );
};

export default HomePage;
