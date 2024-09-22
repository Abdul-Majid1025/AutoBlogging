import { AddCategoryRequest, AddWebsiteRequest, KeywordtoSiteRequest, PublishPostRequest, WritePostRequest } from "../Types/RequestTypes";
import {PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';
import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import { API } from "../Utils/constants";
import { actions } from "Slice/WebsiteSlice";
import { objToFormData } from "../Utils/UtilityFunctions";
import { AddCategory, AddWebsiteResponse, GLobalResponse, GetCategories, GetPostsResponse, GetWebsitesResponse, SiteKeywords, WritePostResponse } from "Types/ReponseTypes";

export function* addWebsite(dispatched: PayloadAction<AddWebsiteRequest>){
  try {
    const payload = objToFormData(dispatched?.payload);
    const response: AddWebsiteResponse = yield call(
      axios.post,
      API.ADD_WEBSITE,
      payload,
    );
    if (response?.status === 200) {
      yield put(actions.websiteAdded(response?.data?.response));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* getWebsites(dispatched: PayloadAction<AddWebsiteRequest>){
  try {
    const response: GetWebsitesResponse = yield call(
      axios.post,
      API.GET_WEBSITES,
      {},
    );
    if (response?.status === 200) {
      yield put(actions.setWebsites(response?.data?.response));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* deleteWebsite(dispatched: PayloadAction<number>){
  try {
    const payload = objToFormData({websiteId: dispatched?.payload});
    const response: GLobalResponse = yield call(
      axios.post,
      API.DELETE_WEBSITE,
      payload,
    );
    if (response?.status === 200) {
      yield put(actions.websiteDeleted(dispatched?.payload));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* getSiteKeywords(dispatched: PayloadAction<number>){
  try {
    const payload = objToFormData({websiteId: dispatched?.payload});
    const response: SiteKeywords = yield call(
      axios.post,
      API.GET_SITE_KEYWORDS,
      payload,
    );
    if (response?.status === 200) {
      yield put(actions.setSiteKeywords(response?.data?.response));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* getPosts(dispatched: PayloadAction<number>){
  try {
    const payload = objToFormData({websiteId: dispatched?.payload});
    const response: GetPostsResponse = yield call(
      axios.post,
      API.GET_POSTS,
      payload,
    );
    if (response?.status === 200) {
      yield put(actions.setPosts(response?.data?.response));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* moveSiteKeywords(dispatched: PayloadAction<KeywordtoSiteRequest>){
  try {
    const payload = objToFormData(dispatched?.payload);
    const response: GLobalResponse = yield call(
      axios.post,
      API.KEYWORDS_TO_SITE,
      payload,
    );
    if (response?.status === 200) {
      
    }
  } catch (err) {
    console.log(err);
  }
}

export function* getCategories(dispatched: PayloadAction<number>){
  try {
    const payload = objToFormData({websiteId: dispatched?.payload});
    const response: GetCategories = yield call(
      axios.post,
      API.GET_CATEGORIES,
      payload,
    );
    if (response?.status === 200) {
      yield put(actions.setCategories(response?.data));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* addCategory(dispatched: PayloadAction<AddCategoryRequest>){
  try {
    const payload = objToFormData(dispatched?.payload);
    const response: AddCategory = yield call(
      axios.post,
      API.ADD_CATEGORY,
      payload,
    );
    if (response?.status === 200) {
      yield put(actions.categoryAdded(response?.data));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* writePost(dispatched: PayloadAction<WritePostRequest>){
    const {keywordIds, websiteId, categoryId } = dispatched?.payload;
    for(let i=0; i<keywordIds.length; i++){
      try {
        const payload = objToFormData({
          websiteId,
          categoryId,
          keywordId: keywordIds[i],
        });
        const response: WritePostResponse = yield call(
          axios.post,
          API.CREATE_POST,
          payload,
        );
        if (response?.status === 200) {
          yield put(actions.postWritten(response?.data));
        }
      } catch (err) {
        console.log(err);
      }
    }
}

export function* publishPosts(dispatched: PayloadAction<PublishPostRequest>){
  try {
    const payload = objToFormData(dispatched?.payload);
    const response: GLobalResponse = yield call(
      axios.post,
      API.PUBLISH_POSTS,
      payload,
    );
    if (response?.status === 200) {
      yield put(actions.postsPublished(dispatched?.payload?.postIds));
    }
  } catch (err) {
    console.log(err);
  }
}


export function* websiteSaga() {
  yield takeLatest(actions.addWebsite.type, addWebsite);
  yield takeLatest(actions.getWebsites.type, getWebsites);
  yield takeLatest(actions.deleteWebsite.type, deleteWebsite);
  yield takeLatest(actions.getSiteKeywords.type, getSiteKeywords);
  yield takeLatest(actions.getPosts.type, getPosts);
  yield takeLatest(actions.moveSiteKeywords.type, moveSiteKeywords);
  yield takeLatest(actions.getCategories.type, getCategories);
  yield takeLatest(actions.addCategory.type, addCategory);
  yield takeLatest(actions.writePost.type, writePost);
  yield takeLatest(actions.publishPosts.type, publishPosts);
}