import * as React from "react";
import { Drawer, Form, Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { createApp } from "../../features/Apps/AppSlice";
import { generateRandomUID } from "../../helper/getRandomUID";
import { PageTypes } from "../../utils/types/App/PageTypes";
interface ICreateAppPageProps {}

const CreateAppPage: React.FunctionComponent<ICreateAppPageProps> = (props) => {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const closeDrawer = () => {
    setOpen(false);
    setTimeout(() => {
      navigate(-1);
    }, 250);
  };

  const initialValues = {
    appName: "",
    pageCount: null,
  };

  const onCreateApp = (values: any) => {
    const pages: PageTypes[] = [];

    for (let i = 0; i < values.pageCount; i++) {
      const id = generateRandomUID();
      pages.push({
        id,
        forms: [],
        title: `Page ${i + 1}`,
        description: `Page ${i + 1} Description`,
        image: null,
      });
    }

    dispatch(
      createApp({
        id: generateRandomUID(),
        ...values,
        pageCount: Number(values.pageCount),
        pages,
      })
    );
    closeDrawer();
  };

  return (
    <Drawer open={open} onClose={closeDrawer} title="Yeni Uygulama Oluştur">
      <Form
        layout="vertical"
        initialValues={initialValues}
        onFinish={onCreateApp}
      >
        <Form.Item
          label="Uygulama Adı"
          rules={[
            { required: true, message: "Alan zorunludur" },
            {
              max: 25,
              message: "En fazla 25 karakter içerebilir",
            },
          ]}
          name={"appName"}
        >
          <Input placeholder="Uygulama Adı" />
        </Form.Item>
        <Form.Item
          label="Sayfa Sayısı"
          rules={[
            { required: true, message: "Alan zorunludur" },
            {
              validator(rule, value, callback) {
                value > 21 || value < 1
                  ? callback("En az 1, en fazla 20 sayfa oluşturabilirsin")
                  : callback();
              },
            },
          ]}
          name={"pageCount"}
        >
          <Input type="number" placeholder="Sayfa Sayısı" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Oluştur
        </Button>
      </Form>
    </Drawer>
  );
};

export default CreateAppPage;
