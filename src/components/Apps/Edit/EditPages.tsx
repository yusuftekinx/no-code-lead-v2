import * as React from "react";
import { PageTypes } from "../../../utils/types/App/PageTypes";
import EditPageItem from "./EditPageItem";
import { Button, Drawer } from "antd";
import { useAppDispatch } from "../../../app/hooks";
import { updatePages } from "../../../features/Apps/AppSlice";
import { useParams } from "react-router-dom";
import { generateRandomUID } from "../../../helper/getRandomUID";

interface IEditPagesProps {
  pages: PageTypes[];
}

const EditPages: React.FunctionComponent<IEditPagesProps> = ({ pages }) => {
  const [activePageIndex, setActivePageIndex] = React.useState<number>(0);

  const [openCalculateDrawer,setOpenCalculateDrawer] = React.useState(false);

  const dispatch = useAppDispatch();

  const { appId } = useParams();


  const closeCalculateDrawer = () => {
    setOpenCalculateDrawer(false);
  }

  const deletePage = (id: string) => {
    if (!appId) return;

    const newPages = [...pages];

    const findPageIndex = newPages.findIndex((page) => page.id === id);

    if (findPageIndex === -1) return;

    newPages.splice(findPageIndex, 1);

    dispatch(
      updatePages({
        appId,
        pages: newPages,
      })
    );
  };

  const addPage = () => {
    if (!appId) return;

    const newPages = [...pages];

    newPages.push({
      id: generateRandomUID(),
      forms: [],
      title: `Page ${pages.length + 1}`,
      description: `Page ${pages.length + 1} Description`,
    });

    dispatch(
      updatePages({
        appId,
        pages: newPages,
      })
    );
  };

  return (
    <React.Fragment>
      <Drawer onClose={closeCalculateDrawer} width={"50%"} open={openCalculateDrawer} title={"Uygulama hesaplama ayarları"}>
        Ayarşar
      </Drawer>
      <EditPageItem
        page={
          pages[activePageIndex]
            ? pages[activePageIndex]
            : pages[pages.length - 1]
        }
      />
      <div>
        <div className="absolute left-2 top-2 flex gap-x-2 items-center justify-center">
          {!pages[activePageIndex].contact ? (
            <Button
              onClick={() => deletePage(pages[activePageIndex].id)}
              type="primary"
              danger
            >
              Sayfayı Sil
            </Button>
          ) : null}
          <Button type="primary" onClick={addPage}>
            Sayfa Ekle
          </Button>
          <Button onClick={() => setOpenCalculateDrawer(true)} type="dashed">
            Hesaplama Ayarları
          </Button>
        </div>
      </div>
      <div className="flex justify-center items-center gap-x-3 absolute bottom-1 right-1">
        {activePageIndex > 0 ? (
          <Button
            danger
            type="primary"
            onClick={() => setActivePageIndex((prev) => prev - 1)}
          >
            Önceki
          </Button>
        ) : null}
        {activePageIndex < pages.length - 1 ? (
          <Button
            danger
            type="primary"
            onClick={() => setActivePageIndex((prev) => prev + 1)}
          >
            Sonraki
          </Button>
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default EditPages;
