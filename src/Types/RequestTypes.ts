export interface CreateReportsRequest{
  reportName: string
}

export interface AddWebsiteRequest{
  websiteName: string
  domain: string
  userName: string
  password: string
  categoryName: string
}

export interface ImportKeywordsRequest{
  reportId: number
  keywords: string
  volume?: string
}

export interface KeywordtoSiteRequest{
  websiteId: number
  keywordIds: string
}

export interface AddCategoryRequest{
  websiteId: number
  categoryName: string
}

export interface WritePostRequest{
  websiteId: number
  keywordIds: number[]
  categoryId: number
}

export interface PublishPostRequest{
  websiteId: number
  postIds: string
  schedulingGap: number
}

export interface MoveReportKeywords{
  reportId: number
  keywordIds: string
}
