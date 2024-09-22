import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "../Slice/KeywordSlice";
import { RootState } from "../Store/InjectorsTypes";

const selectDomain = (state: RootState) => state?.keywords || initialState;

export const selectReports = createSelector([selectDomain], (state) => state.reports);

export const selectKeywords = createSelector([selectDomain], (state) => state.keywords.keywords);

export const selectKeywordsReport = createSelector([selectDomain], (state) => state.keywords.report);

export const selectDomains = createSelector([selectDomain], (state) => state.domains);

export const selectSerpLoading = createSelector([selectDomain], (state) => state.serpLoading);

export const selectNoOfKeywordsWithSerp = createSelector([selectDomain], (state) => state.noOfKeywordsWithSerp);

export const selectKeywordsLoading = createSelector([selectDomain], (state) => state.keywordsLoading);

export const selectImportLoading = createSelector([selectDomain], (state) => state.importLoading);

export const selectRemoveDuplicateLoading = createSelector([selectDomain], (state) => state.removeDuplicateLoading);
