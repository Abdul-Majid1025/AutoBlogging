import { Domain, Keyword, Report } from "./KeywordTypes"
import { Category, Post, Website } from "./WebsiteTypes"

export interface GLobalResponse{
  status: number
  message: string
}

export interface GetReportsResponse extends GLobalResponse{
  data: GetReports
}

export interface GetReports {
  response: Report[]
}

export interface CreateReportsResponse extends GLobalResponse{
  data: CreateReports
}

export interface CreateReports {
  response: Report
}

export interface GetKeywordsResponse extends GLobalResponse{
  data: GetKeywords
}

export interface GetKeywords{
  keywords: Keyword[]
  report: Report
}

export interface ImportKeywordsResponse extends GLobalResponse{
  data: Keyword[]
}

export interface AddWebsiteResponse extends GLobalResponse{
  data: WebsiteData
}

export interface WebsiteData{
  response: WebsiteObject
}

export interface WebsiteObject{
  website: Website
  categories: string[]
}

export interface GetWebsitesResponse extends GLobalResponse{
  data: WebsitesData
}

export interface WebsitesData{
  response: WebsiteObject[]
}

export interface SiteKeywords extends GLobalResponse{
  data: SiteKeywordsData
}

export interface SiteKeywordsData{
  response: Keyword[]
}

export interface GetPostsResponse extends GLobalResponse{
  data: GetPosts
}

export interface GetPosts{
  response: Post[]
}

export interface GetCategories extends GLobalResponse{
  data: Category[]
}

export interface AddCategory extends GLobalResponse{
  data: Category
}

export interface WritePostResponse extends GLobalResponse{
  data: Post
}

export interface GetSerpResponse extends GLobalResponse{
  data: Keyword
}

export interface GetDomainsResponse extends GLobalResponse{
  data: Domain[]
}

