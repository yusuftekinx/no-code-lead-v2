import * as React from "react";
import { FormResultType, FormTypes } from "../../../utils/types/App/PageTypes";
import PreviewTextfieldForm from "../Form/Preview/PreviewTextfieldForm";
import PreviewRadioForm from "../Form/Preview/PreviewRadioForm";
import PreviewCheckboxForm from "../Form/Preview/PreviewCheckboxForm";
import { Form } from "antd";
import { useParams } from "react-router-dom";
import { useFormContext } from "../../../context/FormContext";
import { generateRandomUID } from "../../../helper/getRandomUID";
interface IPreviewFormProps {
  form: FormTypes<any>;
}

const PreviewForm: React.FunctionComponent<IPreviewFormProps> = ({
  form: formProps,
}) => {
  const [currentForm, setCurrentForm] =
    React.useState<FormTypes<any>>(formProps);
  const { appId } = useParams();

  const { results, updateFormResults } = useFormContext();

  const [initialValues, setInitialValues] =
    React.useState<FormResultType | null>(null);

  const [form] = Form.useForm();

  const getFormFieldValue = () => {
    const findForm = results.find((rslt) => rslt.formId === currentForm.id);
    if (!findForm) {
      const values: any = {};

      currentForm.fields.map((field) => {
        values[field.name] =
          field.fieldType === "number" ? parseInt(field.value) : field.value;
      });
      setInitialValues(values);
    } else {
      setInitialValues(findForm.result);
    }
  };

  React.useEffect(() => {
    getFormFieldValue();
  }, []);

  const onUpdatedForm = () => {
    const findResultIndex = results.findIndex(
      (result) => result.formId === currentForm.id
    );
    if (findResultIndex === -1) {
      const newResults = [...results];
      newResults.push({
        id: generateRandomUID(),
        formId: currentForm.id,
        result: form.getFieldsValue(),
      });
      updateFormResults(newResults);
    } else {
      const newResults = [...results];
      newResults[findResultIndex] = {
        ...newResults[findResultIndex],
        result: form.getFieldsValue(),
      };
      updateFormResults(newResults);
    }
  };

  const formTypes = {
    textfield: (
      <div>
        <PreviewTextfieldForm fields={formProps.fields} />
      </div>
    ),
    radio: <PreviewRadioForm updateForm={onUpdatedForm} fields={formProps.fields} />,
    checkbox: <PreviewCheckboxForm fields={formProps.fields} />,
  };

  return (
    <div className="relative p-4 bg-white shadow-sm hover:shadow-md rounded-lg transition-all border-2 border-solid border-gray-200 hover:border-gray-300">
      <div className="grid grid-cols-2 gap-3 items-center">
        <p className="text-base font-semibold">{formProps.title}</p>
      </div>
      {initialValues ? (
        <Form
          initialValues={initialValues}
          form={form}
          onFinish={currentForm.onFinish}
          onChange={onUpdatedForm}
          layout="vertical"
          className="pt-3"
        >
          {formTypes[currentForm.formType]}
        </Form>
      ) : null}
    </div>
  );
};

export default React.memo(PreviewForm);
