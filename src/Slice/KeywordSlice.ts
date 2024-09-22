/* eslint-disable array-callback-return */
import { Domain, Keyword, KeywordState, Report } from "../Types/KeywordTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateReportsRequest, ImportKeywordsRequest, MoveReportKeywords } from "../Types/RequestTypes";
import { GetKeywords } from "Types/ReponseTypes";

export const initialState: KeywordState = {
  keywords: {
    keywords: [],
    report: {} as Report
  },
  keywordsLoading: false,
  importLoading: false,
  reports: [],
  domains: [],
  noOfKeywordsWithSerp: 0,
  serpLoading: false,
  removeDuplicateLoading: false,
}

const keywordSlice = createSlice({
  name: 'keywords',
  initialState: initialState,
  reducers: {
    createReport(state, action: PayloadAction<CreateReportsRequest>){

    },
    getReports(state){

    },
    setReports(state, action: PayloadAction<Report[]>){
      if (state.reports.length === 0){
        state.reports = action.payload;
      } else {
        state.reports = [...state.reports, action.payload[0]]
      }
    },
    getKeywords(state, action: PayloadAction<number>){
      state.keywordsLoading = true;
    },
    setKeywords(state, action: PayloadAction<GetKeywords>){
      state.keywords = action.payload;
      state.keywordsLoading = false;
    },
    deleteReport(state, action: PayloadAction<number>){
    },
    reportDeleted(state, action: PayloadAction<number>){
      state.reports = state.reports.filter((report)=> report.reportId !== action.payload)
    },
    moveReportKeywords(state, action: PayloadAction<MoveReportKeywords>){
    },
    setMoveReportKeywords(state, action: PayloadAction<string>){
      const keywordIds = action.payload.split(',').map(item => item.trim());
      state.keywords.keywords = state.keywords.keywords.filter(keyword => !keywordIds.includes(keyword.keywordId.toString()));
    },
    importKeywords(state, action: PayloadAction<ImportKeywordsRequest>){
      state.importLoading = true;
    },
    keywordsImported(state, action: PayloadAction<GetKeywords>){
      const {keywords, report}= action.payload;
      state.keywords.keywords = state.keywords.keywords.concat(keywords);
      state.keywords.report = report;
      const newArray = [...state.reports];
      const index = newArray.findIndex(newReport => newReport.reportId === report.reportId);
      if (index !== -1) {
        newArray[index] = report;
      }
      state.reports = newArray;
      state.importLoading = false;
    },
    deleteKeyword(state, action: PayloadAction<number>){
    },
    keywordDeleted(state, action: PayloadAction<number>){
      let volume = 0
      state.keywords.keywords = state.keywords.keywords.filter((keyword)=> {
        if (keyword.keywordId !== action.payload){
          return keyword;
      }else {
        volume = keyword.volume;
      }});
      state.keywords.report.totalKeywords = state.keywords.report.totalKeywords - 1;
      if(volume > 0){
        state.keywords.report.totalVolume = state.keywords.report.totalVolume - volume;
      }
    },
    getVolume(state, action: PayloadAction<number>){

    },
    setVolume(state, action: PayloadAction<GetKeywords>){
      state.keywords = action.payload;
    },
    getSerpScore(state, action: PayloadAction<number[]>){
      state.noOfKeywordsWithSerp = state.keywords.keywords?.filter((keyword)=> keyword.serpScore > -1)?.length;
      state.serpLoading = true;
    },
    setSerpScore(state, action: PayloadAction<Keyword>){
      const index = state.keywords.keywords.findIndex((keyword)=> keyword.keywordId === action.payload.keywordId)
      if (index !== -1){
        state.keywords.keywords[index] = action.payload;
        state.noOfKeywordsWithSerp += 1;
      }
    },
    setSerpLoading(state, action: PayloadAction<boolean>){
      state.serpLoading = action.payload;
    },
    getDomains(state, action: PayloadAction<number>){
      
    },
    setDomains(state, action: PayloadAction<Domain[]>){
      state.domains = action.payload;
    },
    resetKeywords(state){
      state.keywords = {} as GetKeywords;
    },
    setImportLoading(state, action: PayloadAction<boolean>){
      state.importLoading = action.payload;
    },
    removeDuplicateKeywords(state, action: PayloadAction<number>){
      state.removeDuplicateLoading = true;
    },
    setRemoveDuplicateKeywords(state, action: PayloadAction<GetKeywords>){
      const {keywords, report} = action.payload;
      const ids = keywords.map(keyword => keyword.keywordId);
      state.keywords.keywords = state.keywords.keywords.filter(keyword => ids.includes(keyword.keywordId));
      state.keywords.report = report;
      state.removeDuplicateLoading = false;
    },
    setRemoveDuplicateLoading(state, action: PayloadAction<boolean>){
      state.removeDuplicateLoading = action.payload;
    },
    reset: (state) => ({
      ...initialState,
    }),
  }
})

export const { actions, reducer, name: keywordKey } = keywordSlice;
