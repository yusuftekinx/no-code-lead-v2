import * as React from "react";
import { CheckboxFormTypes } from "../../../utils/types/App/PageTypes";
import { Button, Checkbox, Form, Input, Radio } from "antd";
import { generateRandomUID } from "../../../helper/getRandomUID";
import CustomTextInput from "../../CustomTextInput/CustomTextInput";

interface ICheckboxForm {
  fields: CheckboxFormTypes[];
  onUpdateFields: (fields: CheckboxFormTypes[]) => void;
}

const CheckboxForm: React.FunctionComponent<ICheckboxForm> = ({
  fields,
  onUpdateFields,
}) => {
  const id = React.useId();
  const [currentFields, setCurrentFields] =
    React.useState<CheckboxFormTypes[]>(fields);

  React.useEffect(() => {
    setCurrentFields(fields);
  }, [fields]);

  React.useEffect(() => {
    onUpdateFields(currentFields);
  }, [currentFields]);

  const createNewField = () => {
    const defaultText = `Checkbox ${currentFields.length + 1}`;

    const id = generateRandomUID();

    const newField: CheckboxFormTypes = {
      id,
      name: `checkbox-${id}`,
      label: defaultText,
      value: defaultText,
    };

    const newFields: CheckboxFormTypes[] = [...currentFields];
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

  const updateCheckboxName = (index: number, name: string) => {
    const newArray = [...currentFields];

    newArray[index] = {
      ...newArray[index],
      name,
    };

    setCurrentFields(newArray);
  };

  return (
    <div className="">
      <div className="grid grid-cols-1 gap-4">
        {currentFields.map((field, index) => {
          return (
            <div key={field.id} className="flex w-full items-center gap-2">
              <Checkbox.Group
                disabled
                key={`${field.id}-radio`}
                className="w-full"
                value={["developemnt"]}
              >
                <Checkbox checked={false}>
                  <CustomTextInput
                    onUpdateComplete={(e: string) => updateLabel(index, e)}
                    defaultValue={field.label}
                  />
                </Checkbox>
              </Checkbox.Group>
              <div className="flex items-center justify-end gap-x-2">
                <Form.Item
                  className="w-64"
                  key={`${field.id}-radio`}
                  label="Onay Kutusu Name Değeri"
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
                  <Input
                    onChange={(e) => updateCheckboxName(index, e.target.value)}
                    value={field.name}
                    placeholder="Onay Kutusu Name Değeri"
                  />
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
      </div>

      {currentFields.length < 10 ? (
        <Button type="primary" className="mt-3" onClick={createNewField}>
          Alan Ekle
        </Button>
      ) : null}
    </div>
  );
};

export default CheckboxForm;
