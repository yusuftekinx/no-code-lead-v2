import { startAppListening } from "../app/listenerMiddleware";
import { createApp, deleteApp, updatePageOfApp } from "../features/Apps/AppSlice";


const features = [createApp,deleteApp,updatePageOfApp]


features.map((feature) => {
  startAppListening({
    actionCreator: feature,
    effect: (_, listenerApi) => {
      const { apps } = listenerApi.getState();
      localStorage.setItem("apps", JSON.stringify(apps));
    },
  });
})
