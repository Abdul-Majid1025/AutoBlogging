import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "../Slice/WebsiteSlice";
import { RootState } from "../Store/InjectorsTypes";

const selectDomain = (state: RootState) => state?.websites || initialState;

export const selectWebsites = createSelector([selectDomain], (state) => state.websites);

export const selectPosts = createSelector([selectDomain], (state) => state.posts);

export const selectCategories = createSelector([selectDomain], (state) => state.categories);

export const selectWebKeywords = createSelector([selectDomain], (state) => state.siteKeywords);
