import * as React from "react";
import { FormTypes } from "../../../utils/types/App/PageTypes";
import CustomTextInput from "../../CustomTextInput/CustomTextInput";
import { Select } from "antd";
import TextFieldForm from "./TextfieldForm";
import RadioForm from "./RadioForm";
import CheckboxForm from "./CheckboxForm";
interface IBaseFormProps {
  form: FormTypes<any>;
  children?: JSX.Element;
  onUpdateForm: (form: FormTypes<any>) => void;
}

const BaseForm: React.FunctionComponent<IBaseFormProps> = ({
  form,
  children,
  onUpdateForm,
}) => {
  const id = React.useId();

  const [currentForm, setCurrentForm] = React.useState<FormTypes<any>>(form);

  const updateFormFields = (fields: any) => {
    setCurrentForm({
      ...currentForm,
      fields,
    });
  };

  const renderForm = {
    textfield: (
      <TextFieldForm fields={form.fields} onUpdateFields={updateFormFields} />
    ),
    radio: <RadioForm fields={form.fields} onUpdateFields={updateFormFields} />,
    checkbox: (
      <CheckboxForm fields={form.fields} onUpdateFields={updateFormFields} />
    ),
  };
  const [currentRenderForm, setCurrentRenderForm] = React.useState<JSX.Element>(
    renderForm[currentForm.formType]
  );

  React.useEffect(() => {
    setCurrentForm(form);
  }, [form]);

  React.useEffect(() => {
    onUpdateForm(currentForm);
  }, [currentForm]);

  React.useEffect(() => {
    setCurrentRenderForm(renderForm[currentForm.formType]);
  }, [currentForm.formType]);

  const updateFormTitle = (title: string) => {
    setCurrentForm({
      ...currentForm,
      title,
    });
  };

  const updateFormType = (type: "textfield" | "radio" | "checkbox") => {
    setCurrentForm({
      ...currentForm,
      formType: type,
      fields: [],
    });
  };

  return (
    <div className="relative p-4 bg-white shadow-sm hover:shadow-md rounded-lg transition-all border-2 border-solid border-gray-200 hover:border-gray-300">
      {children}
      <div className="grid grid-cols-2 gap-3 items-center">
        <CustomTextInput
          defaultValue={form.title}
          className="text-base font-semibold"
          onUpdateComplete={updateFormTitle}
          rules={[
            { required: true, message: "Form başlığı zorunludur" },
            {
              max: 50,
              message: "En fazla 50 karakter olabilir.",
            },
          ]}
        />
        <Select
          id={id}
          value={form.formType}
          onChange={updateFormType}
          key={id}
          options={[
            { label: "Kısa Cevap", value: "textfield" },
            { label: "Çoktan Seçmeli", value: "radio" },
            { label: "Onay Kutuları", value: "checkbox" },
          ]}
        />
      </div>
      <div className="pt-3">{currentRenderForm}</div>
    </div>
  );
};

export default BaseForm;
