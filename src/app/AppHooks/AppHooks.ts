import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const getAppById = (id: string) => {
  return createSelector(
    (state: RootState) => state.apps.apps,
    (apps) => apps.find((app) => app.id === id)
  );
};
