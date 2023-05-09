import { Form, Input, Button } from "antd";
import * as React from "react";
import { LoginTypes } from "../utils/types/Auth/LoginTypes";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { LoginRequest } from "../features/Auth/AuthSlice";
import DefaultLogo from "../components/Logo/DefaultLogo";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";

interface ILoginPageProps {}

const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {
  const dispatch = useAppDispatch();

  const auth = useAppSelector((state) => state.auth);

  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (auth.isLoggedIn) {
      navigate(location.state && location.state.from !== null ? location.state.from : '/dashboard');
    }
  }, [auth.isLoggedIn]);

  const initialFormValue: LoginTypes = {
    email: "",
    password: "",
  };

  const onHandleFinisih = (values: any) => {
    dispatch(LoginRequest(values));
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="flex justify-center items-center w-56">
        <DefaultLogo />
      </div>
      <div className="max-w-[386px] w-full bg-white shadow-md rounded-md p-4">
        <div className="text-center font-semibold text-lg pb-4">Oturum Aç</div>
        <Form
          layout="vertical"
          initialValues={initialFormValue}
          onFinish={onHandleFinisih}
        >
          <Form.Item
            label={"E-Posta"}
            rules={[
              { required: true, message: "Alan zorunludur" },
              {
                validator(rule, value, callback) {
                  !String(value).match(
                    new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
                  )
                    ? callback("Geçersiz e-posta")
                    : callback();
                },
              },
            ]}
            name={"email"}
          >
            <Input placeholder="E-Posta" />
          </Form.Item>
          <Form.Item
            label={"Şifre"}
            rules={[
              { required: true, message: "Alan zorunludur" },
              { min: 6, message: "En az 6 karakter" },
            ]}
            name={"password"}
          >
            <Input.Password placeholder="Şifre" />
          </Form.Item>

          <Form.Item className="m-0 p-2 flex justify-end">
            <Button htmlType="submit" type="primary">
              Giriş Yap
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
