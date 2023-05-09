import * as React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAppById } from "../../app/AppHooks/AppHooks";
import { Alert, Button, Form } from "antd";
import PreviewPage from "../../components/Apps/Preview/PreviewPage";
import ContextForm, { useFormContext } from "../../context/FormContext";
interface IPreviewAppProps {}

const PreviewApp: React.FunctionComponent<IPreviewAppProps> = (props) => {
  const { appId } = useParams();
  const app = useSelector(getAppById(appId ?? ""));

  const [activePageIndex, setActivePageIndex] = React.useState<number>(0);

  const { results } = useFormContext();

  const showAllFormResults = () => {

    let calculate = 0;

    Object.values(results).map((single) => {

      const {result} = single;

      Object.values(result).map((res:any) => {
        if(!isNaN(parseInt(res))) {
          calculate += parseInt(res);
        }
      })
    })

    alert('Toplam Tutar => ' + calculate)
  };


  return (
    <div className="w-full h-screen flex justify-center items-center">
        <div className="flex flex-col gap-y-3 max-h-[576px] h-full max-w-[1024px] w-full m-4 ">
          <div className="flex justify-start items-center flex-wrap gap-2">
            {app ? (
              <span>
                <b>{app?.appName}</b> uygulamasını inceliyorsun
              </span>
            ) : null}
            <Link
              to={"/apps"}
              className="bg-red-500 text-white p-2 rounded-md"
              role="alert"
            >
              Geri Dön
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-md border border-solid border-gray-400 w-full h-full">
            {app ? (
              <PreviewPage page={app?.pages[activePageIndex]}>
                <div className="bg-transparent w-full flex justify-between px-4 items-center gap-x-3 absolute z-20 bottom-0 pb-2 shadow-gray-300 right-0">
                  {activePageIndex > 0 ? (
                    <Button
                      danger
                      type="primary"
                      onClick={() => setActivePageIndex((prev) => prev - 1)}
                      htmlType="button"
                    >
                      Önceki
                    </Button>
                  ) : (
                    <div></div>
                  )}
                  {activePageIndex < app.pages.length - 1 ? (
                    <Button
                      danger
                      htmlType="button"
                      type="primary"
                      onClick={() => setActivePageIndex((prev) => prev + 1)}
                    >
                      Sonraki
                    </Button>
                  ) : (
                    <Button
                      onClick={showAllFormResults}
                      danger
                      htmlType="submit"
                      type="primary"
                    >
                      Kaydet
                    </Button>
                  )}
                </div>
              </PreviewPage>
            ) : (
              <Alert message={"Sayfa yüklenirken bir problem oluştu"} />
            )}
          </div>
        </div>
    </div>
  );
};

export default React.memo(PreviewApp);
