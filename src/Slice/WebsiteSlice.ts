import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Keyword } from "Types/KeywordTypes";
import { WebsiteObject } from "Types/ReponseTypes";
import { AddCategoryRequest, AddWebsiteRequest, KeywordtoSiteRequest, PublishPostRequest, WritePostRequest } from "Types/RequestTypes";
import { Category, Post, WebsiteState } from "Types/WebsiteTypes";

export const initialState: WebsiteState = {
  websites: [],
  posts: [],
  categories: [],
  siteKeywords: []
}

const websiteSlice = createSlice({
  name: 'websites',
  initialState: initialState,
  reducers: {
    addWebsite(state, action: PayloadAction<AddWebsiteRequest>){

    },
    websiteAdded(state, action: PayloadAction<WebsiteObject>){
      if (state.websites.length === 0){
        state.websites = [action.payload.website];
      } else {
        state.websites = [...state.websites, action.payload.website]
      }
    },
    getWebsites(state){
    },
    setWebsites(state, action: PayloadAction<WebsiteObject[]>){
      action.payload.forEach((websiteData)=> state.websites = [...state.websites, websiteData.website])
    },
    deleteWebsite(state, action: PayloadAction<number>){
    },
    websiteDeleted(state, action: PayloadAction<number>){
      state.websites = state.websites.filter((website)=> website.websiteId !== action.payload)
    },
    getSiteKeywords(state, action: PayloadAction<number>){
    },
    setSiteKeywords(state, action: PayloadAction<Keyword[]>){
      state.siteKeywords = action.payload;
    },
    getPosts(state, action: PayloadAction<number>){
    },
    setPosts(state, action: PayloadAction<Post[]>){
      state.posts = action.payload;
    },
    getCategories(state, action: PayloadAction<number>){
    },
    setCategories(state, action: PayloadAction<Category[]>){
      state.categories = action.payload;
    },
    addCategory(state, action: PayloadAction<AddCategoryRequest>){

    },
    categoryAdded(state, action: PayloadAction<Category>){
      state.categories = [...state.categories, action.payload];
    },
    moveSiteKeywords(state, action: PayloadAction<KeywordtoSiteRequest>){
      
    },
    writePost(state, action: PayloadAction<WritePostRequest>){

    },
    postWritten(state, action: PayloadAction<Post>){
      state.posts = [...state.posts, action.payload];
    },
    publishPosts(state, action: PayloadAction<PublishPostRequest>){
    },
    postsPublished(state, action: PayloadAction<string>){
      const postIds = action.payload.split(',').map(number => Number(number.trim()));
      postIds.forEach((postId)=>{
        state.posts = state.posts.map((post)=>{
          if (post.postId === postId){
            post.isPublished = true;
          }
          return post;
        })
      })
    },
    reset: (state) => ({
      ...initialState,
    }),
  }
})

export const { actions, reducer, name: websiteKey } = websiteSlice;
