import { CreateReportsRequest, ImportKeywordsRequest, MoveReportKeywords } from "../Types/RequestTypes";
import {PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';
import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import { API } from "../Utils/constants";
import { actions } from "../Slice/KeywordSlice";
import { CreateReportsResponse, GLobalResponse, GetDomainsResponse, GetKeywordsResponse, GetReportsResponse, GetSerpResponse } from "../Types/ReponseTypes";
import { objToFormData } from "../Utils/UtilityFunctions";
import { Report } from "Types/KeywordTypes";
import { message } from "antd";

export function* createReport(dispatched: PayloadAction<CreateReportsRequest>){
  try {
    const payload = objToFormData(dispatched?.payload);
    const response: CreateReportsResponse = yield call(
      axios.post,
      API.CREATE_REPORT,
      payload,
    );
    if (response?.status === 200) {
      const data = [response.data.response] as Report[]
      yield put(actions.setReports(data));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* getReports(){
  try {
    const response: GetReportsResponse = yield call(
      axios.post,
      API.GET_REPORTS,
      {},
    );
    if (response?.status === 200) {
      yield put(actions.setReports(response?.data?.response));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* getKeywords(dispatched: PayloadAction<number>){
  try {
    const payload = objToFormData({reportId: dispatched.payload});
    const response: GetKeywordsResponse = yield call(
      axios.post,
      API.GET_KEYWORDS,
      payload,
    );
    if (response?.status === 200) {
      yield put(actions.setKeywords(response?.data));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* deleteReport(dispatched: PayloadAction<number>){
  try {
    const payload = objToFormData({reportId: dispatched.payload});
    const response: GLobalResponse = yield call(
      axios.post,
      API.DELETE_REPORTS,
      payload,
    );
    if (response?.status === 200) {
      yield put(actions.reportDeleted(dispatched.payload));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* importKeywords(dispatched: PayloadAction<ImportKeywordsRequest>){
  try {
    const payload = objToFormData(dispatched.payload);
    const keywordsApi = dispatched.payload?.volume?.length ? API.UPLOAD_KEYWORDS: API.IMPORT_KEYWORDS;
    const text = dispatched.payload?.volume?.length ? 'Keywords uploaded successfully' : 'Keywords Imported successfully'
    const response: GetKeywordsResponse = yield call(
      axios.post,
      keywordsApi,
      payload,
    );
    if (response?.status === 200) {
      yield put(actions.keywordsImported(response?.data))
      message.success(text);
    } else {
      message.error('Something went wrong');
      yield put(actions.setImportLoading(false));
    }
  } catch (err) {
    message.error('Something went wrong');
    yield put(actions.setImportLoading(false));
  }
}

export function* deleteKeyword(dispatched: PayloadAction<number>){
  try {
    const payload = objToFormData({keywordId: dispatched.payload});
    const response: GLobalResponse = yield call(
      axios.post,
      API.DELETE_KEYWORDS,
      payload,
    );
    if (response?.status === 200) {
      yield put(actions.keywordDeleted(dispatched.payload));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* getDomains(dispatched: PayloadAction<number>){
  try {
    const payload = objToFormData({reportId: dispatched.payload});
    const response: GetDomainsResponse = yield call(
      axios.post,
      API.GET_DOMAINS,
      payload,
    );
    if (response?.status === 200) {
      yield put(actions.setDomains(response?.data));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* moveReportKeywords(dispatched: PayloadAction<MoveReportKeywords>){
  try {
    const payload = objToFormData(dispatched.payload);
    const response: GLobalResponse = yield call(
      axios.post,
      API.KEYWORDS_TO_REPORT,
      payload,
    );
    if (response?.status === 200) {
      yield put(actions.setMoveReportKeywords(dispatched?.payload?.keywordIds))
    }
  } catch (err) {
    console.log(err);
  }
}

export function* getVolume(dispatched: PayloadAction<number>){
  try {
    const payload = objToFormData({reportId: dispatched.payload});
    const response: GetKeywordsResponse = yield call(
      axios.post,
      API.GET_VOLUME,
      payload,
    );
    if (response?.status === 200) {
      yield put(actions.setVolume(response?.data));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* getSerpScore(dispatched: PayloadAction<number[]>){
  try {
    const keywordIds = dispatched.payload
    for(let i=0; i<keywordIds.length; i++){
      const payload = objToFormData({keywordId: keywordIds[i]});
      const response: GetSerpResponse = yield call(
        axios.post,
        API.GET_SERP_SCORE,
        payload,
      );
      if (response?.status === 200) {
        yield put(actions.setSerpScore(response?.data));
      }
      if(i === keywordIds.length - 1){
        yield put(actions.setSerpLoading(false));
      }
    }
  } catch (err) {
    console.log(err);
    yield put(actions.setSerpLoading(false));
  }
}

export function* removeDuplicateKeywords(dispatched: PayloadAction<number>){
  try {
    const payload = objToFormData({reportId: dispatched.payload});
    const response: GetKeywordsResponse = yield call(
      axios.post,
      API.REMOVE_DUPLICATE_KEYWORDS,
      payload,
    );
    if (response?.status === 200) {
      yield put(actions.setRemoveDuplicateKeywords(response?.data));
      message.success('Duplicates Removed Successfully');
    } else {
      yield put(actions.setRemoveDuplicateLoading(false));
      message.success('Failed to Remove Duplicates');
    }
  } catch (err) {
    console.log(err);
  }
}

export function* keywordSaga() {
  yield takeLatest(actions.createReport.type, createReport);
  yield takeLatest(actions.getReports.type, getReports);
  yield takeLatest(actions.getKeywords.type, getKeywords);
  yield takeLatest(actions.deleteReport.type, deleteReport);
  yield takeLatest(actions.moveReportKeywords.type, moveReportKeywords);
  yield takeLatest(actions.getDomains.type, getDomains);
  yield takeLatest(actions.importKeywords.type, importKeywords);
  yield takeLatest(actions.deleteKeyword.type, deleteKeyword);
  yield takeLatest(actions.getVolume.type, getVolume);
  yield takeLatest(actions.getSerpScore.type, getSerpScore);
  yield takeLatest(actions.removeDuplicateKeywords.type, removeDuplicateKeywords);
}