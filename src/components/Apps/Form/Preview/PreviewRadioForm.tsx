import * as React from "react";
import {
  RadioFormTypes,
  TextfieldFormTypes,
} from "../../../../utils/types/App/PageTypes";
import { Form, Input, Radio, RadioChangeEvent } from "antd";

interface IPreviewRadioFormProps {
  fields: RadioFormTypes[];
  updateForm: (results: any) => void;
}

const PreviewRadioForm: React.FunctionComponent<IPreviewRadioFormProps> = ({
  fields,
  updateForm,
}) => {
  return (
    <div className="">
      <div className="grid grid-cols-1 gap-2">
        <Form.Item name={"radio-form"}>
          <Radio.Group className="flex gap-3 flex-wrap">
            {fields.map((field) => {
              return <Radio value={field.value}>{field.label}</Radio>;
            })}
          </Radio.Group>
        </Form.Item>
      </div>
    </div>
  );
};

export default PreviewRadioForm;
