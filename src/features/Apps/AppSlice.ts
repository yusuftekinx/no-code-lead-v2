import { PageTypes } from './../../utils/types/App/PageTypes';
import { AppTypes } from "../../utils/types/App/AppTypes";
import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { InitialAppState } from "../../utils/types/State/AppsState";
import { generateRandomUID } from '../../helper/getRandomUID';

const initialState: InitialAppState = {
  apps: [],
};

export const appSlice = createSlice({
  name: "apps",
  initialState,
  reducers: {
    setApp: (state) => {
      const apps = localStorage.getItem("apps");
      if (!apps) return;
      state.apps = JSON.parse(apps).apps;
    },
    createApp: (state, { payload }: PayloadAction<AppTypes>) => {
      state.apps.push(payload);
      toast.success("Oluşturuldu");
    },
    deleteApp: (
      state,
      {
        payload,
      }: PayloadAction<{
        appId: string;
      }>
    ) => {
      state.apps = state.apps.filter((app) => app.id !== payload.appId);
      toast.success("Kaldırıldı");
    },

    updatePageOfApp: (state,{payload}:PayloadAction<{
      page: PageTypes,
      appId: String;
    }>) => {
      const {page,appId} = payload;

      const findApp = state.apps.find((app) => app.id === appId);
      
      if(!findApp) return;

      const findPageIndex = findApp.pages.findIndex(crPage => crPage.id === page.id);
      
      const newArray = [...findApp.pages];

      newArray[findPageIndex] = page;

      findApp.pages = newArray;
    },

    updatePages: (state, {payload}:PayloadAction<{
      pages: PageTypes[],
      appId:string;
    }>)=> {
      const {pages,appId} = payload;

      const findApp = state.apps.find(app => app.id === appId);

      if(!findApp) return;

      findApp.pages = pages;

    },

    contactPageManage: (state, {payload}: PayloadAction<{
      remove?: boolean;
      appId: string
    }>) => {
      const {remove,appId} = payload;

      const findApp = state.apps.find((app) => app.id === appId);

      if(!findApp) return;
      if(remove && remove === true) {
        const findContactPageIndex = findApp.pages.findIndex((page) => page.contact && page.contact === true);
        if(!findContactPageIndex) return;
        const newArrays = [...findApp.pages];
        newArrays.splice(findContactPageIndex,1);
        findApp.pages = newArrays;
      } 
      else {
        findApp.pages.push({
          id:generateRandomUID(),
          forms: [],
          title: "İletişim",
          description: 'Bizimle iletişime geçin',
          contact: true
        })
      }
    }

    
  },
});



export const { createApp, deleteApp, setApp,updatePageOfApp,contactPageManage,updatePages} = appSlice.actions;

export default appSlice.reducer;
