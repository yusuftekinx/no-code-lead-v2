import { useEffect,createContext, useState, useContext } from "react";
import { FormResultType } from "../utils/types/App/PageTypes";

const FormContext = createContext<{
  results: FormResultType[];
  updateFormResults: (results: FormResultType[]) => void;
}>({
  results: [],
  updateFormResults(results) {},
});

interface IFormContextProps {
  children: JSX.Element;
}

const ContextForm: React.FunctionComponent<IFormContextProps> = ({
  children,
}) => {
  const [results, setResults] = useState<FormResultType[]>([]);

  useEffect(() => {
    console.log(results);
  },[results])

  return (
    <FormContext.Provider
      value={{
        results,
        updateFormResults: setResults,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);

export default ContextForm;
