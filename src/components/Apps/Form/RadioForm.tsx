import * as React from "react";
import {
  BaseFormFieldTypes,
  RadioFormTypes,
  TextfieldFormTypes,
} from "../../../utils/types/App/PageTypes";
import { Button, Form, Input, Radio, Select } from "antd";
import { generateRandomUID } from "../../../helper/getRandomUID";
import CustomTextInput from "../../CustomTextInput/CustomTextInput";

interface IRadioFormProps {
  fields: RadioFormTypes[];
  onUpdateFields: (fields: RadioFormTypes[]) => void;
}

const RadioForm: React.FunctionComponent<IRadioFormProps> = ({
  fields,
  onUpdateFields,
}) => {
  const id = React.useId();
  const [currentFields, setCurrentFields] =
    React.useState<RadioFormTypes[]>(fields);

  React.useEffect(() => {
    setCurrentFields(fields);
  }, [fields]);

  React.useEffect(() => {
    onUpdateFields(currentFields);
  }, [currentFields]);

  const createNewField = () => {
    const defaultText = `Radio ${currentFields.length + 1}`;

    const id = generateRandomUID();

    const newField: RadioFormTypes = {
      id,
      name: `radio-${id}`,
      label: defaultText,
      value: defaultText,
    };

    const newFields: RadioFormTypes[] = [...currentFields];
    newFields.push(newField);

    setCurrentFields(newFields);
  };

  const deleteField = (id: string) => {
    const findIndex = currentFields.findIndex((field) => field.id === id);
    const newFields = [...currentFields];
    newFields.splice(findIndex, 1);
    setCurrentFields(newFields);
  };

  const updateLabel = (index: number, label: string) => {
    const newArray = [...currentFields];

    newArray[index] = {
      ...newArray[index],
      label,
    };

    setCurrentFields(newArray);
  };

  const updateRadioName = (index:number,name: string) => {
    const newArray = [...currentFields];

    newArray[index] = {
      ...newArray[index],
      name,
    };

    setCurrentFields(newArray);
  }

  
  const updateRadioValue = (index:number,value: string) => {
    const newArray = [...currentFields];

    newArray[index] = {
      ...newArray[index],
      value,
    };

    setCurrentFields(newArray);
  }

  return (
    <div className="">
      <div className="grid grid-cols-1 gap-4">
        <Form layout="vertical">
          {currentFields.map((field, index) => {
            return (
              <div key={field.id} className="flex md:flex-nowrap flex-wrap w-full items-center gap-2">
                <Radio.Group
                  disabled
                  key={`${field.id}-radio`}
                  className="w-full flex items-center justify-start gap-x-4"
                >
                  <Radio checked={false}>
                    <CustomTextInput
                      onUpdateComplete={(e: string) => updateLabel(index, e)}
                      defaultValue={field.label}
                      rules={[
                        {
                          max: 175,
                          message: "En fazla 175 karakter içermelidir",
                        },
                        { required: true, message: "Zorunlu Alan" },
                      ]}
                    />
                  </Radio>
                </Radio.Group>
                <div className="flex items-center gap-x-2 md:flex-nowrap flex-wrap">
                <Form.Item
                    className="w-auto"
                    label="Radio Değeri"
                    rules={[
                      { required: true, message: "Alan zorunludur" },
                    ]}
                  >
                    <Input onChange={(e) => updateRadioValue(index,e.target.value)} value={field.value} placeholder="Radio Name Değeri" />
                  </Form.Item>
                  <Form.Item
                    className="w-64"
                    key={`${field.id}-radio`}
                    label="Radio Name Değeri"
                    rules={[
                      { max: 30, message: "En fazla 30 karakter" },
                      {
                        validator(rule, value, callback) {
                          !String(value).match(new RegExp(/^[A-Za-z0-9-]+$/))
                            ? callback("Geçersiz input name value")
                            : callback();
                        },
                      },
                      { min: 5, message: "En az 5 karakter" },
                      { required: true, message: "Alan zorunludur" },
                    ]}
                  >
                    <Input onChange={(e) => updateRadioName(index,e.target.value)} value={field.name} placeholder="Radio Name Değeri" />
                  </Form.Item>
                  <Button
                    onClick={() => deleteField(field.id)}
                    danger
                    type="dashed"
                    className="mt-2"
                  >
                    Del
                  </Button>
                </div>
              </div>
            );
          })}
        </Form>
      </div>

      {currentFields.length < 10 ? (
        <Button type="primary" className="mt-3" onClick={createNewField}>
          Alan Ekle
        </Button>
      ) : null}
    </div>
  );
};

export default RadioForm;
