import * as React from "react";
import { FormTypes, PageTypes } from "../../../utils/types/App/PageTypes";
import NoImage from "../../NoImage/NoImage";
import CustomTextInput from "../../CustomTextInput/CustomTextInput";
import { useAppDispatch } from "../../../app/hooks";
import { updatePageOfApp } from "../../../features/Apps/AppSlice";
import { useParams } from "react-router-dom";
import { Button } from "antd";
import BaseForm from "../Form/BaseForm";
import { generateRandomUID } from "../../../helper/getRandomUID";
import { DeleteOutlined } from "@ant-design/icons";

interface IEditPageItemProps {
  page: PageTypes;
}

const EditPageItem: React.FunctionComponent<IEditPageItemProps> = ({
  page,
}) => {
  const [currentPage, setCurrentPage] = React.useState<PageTypes>(page);
  const dispatch = useAppDispatch();
  const onUpdateCurrentPage = (page: PageTypes) => {
    setCurrentPage(page);
  };

  const { appId } = useParams();

  const updateImage = (image: string) => {
    onUpdateCurrentPage({
      ...currentPage,
      image,
    });
  };

  const updateTitle = (title: string) => {
    onUpdateCurrentPage({
      ...currentPage,
      title,
    });
  };

  const updateDescription = (description: string) => {
    onUpdateCurrentPage({
      ...currentPage,
      description,
    });
  };

  React.useEffect(() => {
    if (appId) {
      dispatch(
        updatePageOfApp({
          page: currentPage,
          appId,
        })
      );
    }
  }, [currentPage]);

  React.useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const createFormCurrentPage = () => {
    const formId = generateRandomUID();
    setCurrentPage({
      ...currentPage,
      forms: [
        ...currentPage.forms,
        {
          fields: [],
          formType: "textfield",
          title: `Form ${currentPage.forms.length + 1}`,
          id: formId,
        },
      ],
    });
  };

  const onUpdateForm = (form: FormTypes<any>) => {
    const findFormIndex = currentPage.forms.findIndex(
      (currentForm) => currentForm.id === form.id
    );

    const newArray = [...currentPage.forms];

    newArray[findFormIndex] = form;

    setCurrentPage({
      ...currentPage,
      forms: newArray,
    });
  };

  const deleteForm = (index: number) => {
    const newForms = [...currentPage.forms];
    newForms.splice(index, 1);
    setCurrentPage({
      ...currentPage,
      forms: newForms,
    });
  };

  const deletePage = () => {

  }

  return (
    <React.Fragment>
      <div className="flex items-center justify-center gap-x-2 absolute right-9 top-2 z-20">
        <Button
          onClick={createFormCurrentPage}
        >
          Form Ekle
        </Button>
      </div>
      <div className="w-5/12 h-full relative rounded-l-lg">
        {currentPage.image ? (
          <img
            className="object-cover rounded-l-lg w-full h-full"
            draggable={false}
            src={currentPage.image}
          />
        ) : (
          <NoImage>
            <div className="absolute w-full h-full flex justify-center items-center">
              <CustomTextInput
                onUpdateComplete={updateImage}
                placeholder="Sayfa Görseli"
                rules={[{ type: "url", message: "Geçersiz Url" }]}
              />
            </div>
          </NoImage>
        )}
      </div>
      <div className="p-3 w-7/12 rounded-r-lg h-full overflow-y-auto">
        <div className="flex flex-col items-start">
          <CustomTextInput
            className="text-xl font-bold"
            defaultValue={page.title}
            onUpdateComplete={updateTitle}
            rules={[
              { required: true, message: "Başlık zorunludur" },
              { max: 30, message: "En fazla 30 karakter içermelidir" },
            ]}
          />
          <CustomTextInput
            onUpdateComplete={updateDescription}
            className="text-sm"
            defaultValue={page.description}
            placeholder={
              page.description?.length === 0 ? "Açıklama Ekle" : undefined
            }
            rules={[{ max: 200, message: "En fazla 200 karakter içermelidir" }]}
          />
        </div>
        <div className="mt-3 p-2 grid grid-cols-1 gap-3">
          {page.forms.map((form, _) => {
            return (
              <BaseForm key={form.id} onUpdateForm={onUpdateForm} form={form}>
                <Button
                  onClick={() => deleteForm(_)}
                  type="primary"
                  className="w-8 h-8 absolute -left-4 -top-3 flex justify-center items-center"
                  danger
                >
                  <DeleteOutlined />
                </Button>
              </BaseForm>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default EditPageItem;
