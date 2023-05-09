import * as React from "react";
import {
  BaseFormFieldTypes,
  TextfieldFormTypes,
} from "../../../utils/types/App/PageTypes";
import { Button, Form, Input, Select } from "antd";
import { generateRandomUID } from "../../../helper/getRandomUID";

interface ITextFieldFormProps {
  fields: TextfieldFormTypes[];
  onUpdateFields: (fields: TextfieldFormTypes[]) => void;
}

const TextFieldForm: React.FunctionComponent<ITextFieldFormProps> = ({
  fields,
  onUpdateFields,
}) => {
  const id = React.useId();
  const [currentFields, setCurrentFields] =
    React.useState<TextfieldFormTypes[]>(fields);

  React.useEffect(() => {
    setCurrentFields(fields);
  }, [fields]);

  React.useEffect(() => {
    onUpdateFields(currentFields);
  }, [currentFields]);

  const createNewField = () => {
    const defaultText = `Textfield ${currentFields.length + 1}`;

    const id = generateRandomUID();

    const newField: TextfieldFormTypes = {
      id,
      name: `textfield-${id}`,
      fieldType: "text",
      label: defaultText,
      placeholder: defaultText,
      value: ''
    };

    const newFields: TextfieldFormTypes[] = [...currentFields];
    newFields.push(newField);

    setCurrentFields(newFields);
  };

  const deleteField = (id:string) => {
    const findIndex = currentFields.findIndex((field) => field.id === id)
    const newFields = [...currentFields];
    newFields.splice(findIndex,1);
    setCurrentFields(newFields);
  };

  const updateFieldType = (index: number, newType: "number" | "text") => {
    const newArray = [...currentFields];

    newArray[index] = {
      ...newArray[index],
      fieldType: newType,
    };

    setCurrentFields(newArray);
  };

  const updatePlaceHolder = (index: number, placeholder: string) => {
    const newArray = [...currentFields];

    newArray[index] = {
        ...newArray[index],
        placeholder
    }

    setCurrentFields(newArray);
  }

  const updateFieldName = (index: number, fieldName: string) => {
    const newArray = [...currentFields];

    newArray[index] = {
        ...newArray[index],
        name: fieldName
    }

    setCurrentFields(newArray);
  }
  

  return (
    <div className="">
      <div className="grid grid-cols-1 gap-4">
        {currentFields.map((field, index) => {
          return (
            <Form
              key={field.id}
              layout="vertical"
              id={id}
              className="grid grid-cols-1 md:grid-cols-3 gap-3"
              initialValues={{
                "input-value-name":field.name
              }}
            >
              <Form.Item
                key={`${field.id}-label`}
                label="Label-Placeholder Yazısı (Opsiyonel)"
                rules={[{ max: 50, message: "En fazla 50 karakter" }]}
              >
                <Input onChange={(e) => updatePlaceHolder(index,e.currentTarget.value)} value={field.placeholder} placeholder="Label-Placeholder Yazısı (Opsiyonel)" />
              </Form.Item>
              
              <Form.Item
                key={`${field.id}-name`}
                label="Input Name Değeri"
                rules={[{ max: 30, message: "En fazla 30 karakter" },
                {validator(rule, value, callback) {
                  !String(value).match(new RegExp(/^[A-Za-z0-9-]+$/)) ? callback("Geçersiz input name value") : callback();
                },}
                ,{min:5,message:"En az 5 karakter"},{required:true,message:"Alan zorunludur"}]}
                name={"input-value-name"}
              >
                <Input onChange={(e) => updateFieldName(index,e.currentTarget.value)} value={field.name} placeholder="Input Name Değeri" />
              </Form.Item>

              <div className="flex w-full items-center gap-2">
                <Form.Item key={`${field.id}-type`} label="Input Türü" className="w-full">
                  <Select
                    value={field.fieldType}
                    onChange={(e: "text" | "number") =>
                      updateFieldType(index, e)
                    }
                    options={[
                      { value: "text", label: "Metin" },
                      { value: "number", label: "Sayı" },
                    ]}
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
            </Form>
          );
        })}
      </div>

      {
        currentFields.length < 10 ? <Button type="primary" onClick={createNewField}>
        Alan Ekle
      </Button> : null
      }
    </div>
  );
};

export default TextFieldForm;
