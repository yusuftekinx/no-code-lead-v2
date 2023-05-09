import { Rule } from "antd/es/form";


export interface PageTypes {
    contact?: boolean;
    id: string;
    title: string;
    description?: string;
    image?:string | null;
    forms: FormTypes<any>[]
}

export interface FormTypes<T> {
    id:string;
    title:string;
    formType: "textfield" | "radio" | "checkbox",
    fields: T[],
    onFinish?: (values: any) => void;
}

export interface BaseFormFieldTypes {
    id:string;
    name: string;
}

export interface TextfieldFormTypes extends BaseFormFieldTypes{
    placeholder?: string;
    value:string;
    fieldType: "number" | "text";
    rules?: Rule[] // deactive
    label?: string;
}

export interface RadioFormTypes extends BaseFormFieldTypes {
    checked?: boolean;
    label: string;
    value:string;
}

export interface CheckboxFormTypes extends BaseFormFieldTypes {
    checked?: boolean;
    label: string;
    value:string;
}

export interface RenderFormType {
    formType: string;
    render: () => JSX.Element
}

export interface FormResultType {
    id:string;
    formId: string;
    result: any;
} 