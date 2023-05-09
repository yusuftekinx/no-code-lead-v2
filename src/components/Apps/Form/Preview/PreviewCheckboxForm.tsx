import * as React from "react";
import { RadioFormTypes } from "../../../../utils/types/App/PageTypes";
import { Checkbox, Form, Radio } from "antd";

interface IPreviewRadioFormProps {
  fields: RadioFormTypes[];
}

const PreviewCheckboxForm: React.FunctionComponent<IPreviewRadioFormProps> = ({
  fields,
}) => {
  return (
    <div className="">
      <div className="grid grid-cols-1 gap-2">
        <div className="flex gap-3 flex-wrap">
          <Form.Item name={"checkbox-form"}>
            <Checkbox.Group className="flex gap-3 flex-wrap">
              {fields.map((field, index) => {
                return (
                  <Checkbox key={field.id} value={field.label}>
                    {field.label}
                  </Checkbox>
                );
              })}
            </Checkbox.Group>
          </Form.Item>
        </div>
      </div>
    </div>
  );
};

export default PreviewCheckboxForm;
