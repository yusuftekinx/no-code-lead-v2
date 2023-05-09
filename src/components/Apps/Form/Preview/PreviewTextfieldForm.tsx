import * as React from "react";
import { TextfieldFormTypes } from "../../../../utils/types/App/PageTypes";
import { Form, Input } from "antd";

interface IPreviewTextfieldFormProps {
  fields: TextfieldFormTypes[];
}

const PreviewTextfieldForm: React.FunctionComponent<
  IPreviewTextfieldFormProps
> = ({ fields }) => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
      {fields.map((field, index) => {
        return (
          <div key={field.id} className="grid grid-cols-1 gap-3">
            <Form.Item
              className="m-1"
              key={`${field.id}`}
              label={field.placeholder}
              name={field.name}
            >
              <Input type={field.fieldType} placeholder={field.placeholder} />
            </Form.Item>
            
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(PreviewTextfieldForm);
