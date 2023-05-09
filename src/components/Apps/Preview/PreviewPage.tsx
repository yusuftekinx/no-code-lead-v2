import * as React from "react";
import { FormResultType, PageTypes } from "../../../utils/types/App/PageTypes";
import NoImage from "../../NoImage/NoImage";
import PreviewForm from "./PreviewForm";

interface IPreviewPageProps {
  page: PageTypes;
  children?: JSX.Element;
}

const PreviewPage: React.FunctionComponent<IPreviewPageProps> = ({
  page,
  children,
}) => {
  return (
    <div className="relative w-full h-full flex md:flex-row flex-col pb-12">
      <div className="md:w-5/12 w-full h-[576px] relative rounded-l-lg overflow-hidden">
        {page.image ? (
          <img
            className="object-cover rounded-l-lg w-full h-full hover:scale-105 transition-all"
            draggable={false}
            src={page.image}
          />
        ) : (
          <NoImage>
            <div className="absolute w-full h-full flex justify-center items-center">
              Görsel Yok
            </div>
          </NoImage>
        )}
      </div>
      {children}
      <div className="relative p-3 md:w-7/12 w-full rounded-r-lg h-full overflow-y-auto">
        <div className="flex flex-col items-start gap-y-3">
          <p className="text-xl font-bold">{page.title}</p>
          <p className="text-sm">{page.description}</p>
        </div>
        <div className="mt-3 p-2 grid grid-cols-1 gap-3">
          {page.forms.map((form) => {
            return <PreviewForm key={form.id} form={form} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
