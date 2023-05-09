import * as React from "react";
import { Form, Input, Tooltip } from "antd";
import { Rule } from "antd/lib/form";

interface ICustomTextInputProps {
  placeholder?: string;
  onUpdateComplete?: Function;
  type?: "text" | "textarea";
  defaultValue?: string;
  rules?: Rule[];
  className?: string;
}

const CustomTextInput: React.FunctionComponent<ICustomTextInputProps> = ({
  placeholder,
  onUpdateComplete,
  defaultValue,
  rules,
  className,
}) => {
  const [isInput, setIsInput] = React.useState(false);
  if (isInput) {
    return (
      <Form
        onFinish={(e) => {
          if (onUpdateComplete) {
            onUpdateComplete(e.text);
          }
          setIsInput(false);
        }}
      >
        <Form.Item
          className="m-0"
          initialValue={defaultValue}
          name={"text"}
          rules={rules}
        >
          <Input
            onBlur={() => setIsInput(false)}
            autoComplete="off"
            autoFocus
            placeholder={placeholder}
          />
        </Form.Item>
      </Form>
    );
  } else {
    return (
      <Tooltip title="Tıkla ve güncelle" className="w-auto">
        <span
          className={`cursor-pointer hover:bg-gray-200 relative transition-all rounded-md p-2 ${className}`}
          onClick={() => setIsInput(true)}
        >
          {defaultValue ? defaultValue : placeholder}
        </span>
      </Tooltip>
    );
  }
};

export default CustomTextInput;
