import { GetKeywords } from "./ReponseTypes"

export interface KeywordState{
  keywords: GetKeywords
  reports: Report[]
  domains: Domain[]
  keywordsLoading: boolean
  importLoading: boolean
  noOfKeywordsWithSerp: number
  serpLoading: boolean
  removeDuplicateLoading: boolean
}

export interface Keyword{
  keywordId: number
  keywordName: string
  serpScore: number
  volume: number
  keywordType: string
  contentWritten: boolean
  urls: URL[]
}

export interface Report{
  reportId: number
  reportName: string
  reportImage: string
  totalKeywords: number
  totalVolume: number
  inProgress: boolean
}

export interface URL{
  urlId: number
  url: string
  urlTitle: string
  urlMeta: string
  urlDomainAge: number
  wordCount: number
  isForum: boolean
}

export interface URL{
  urlId: number
  url: string
  urlTitle: string
  urlMeta: string
  urlDomainAge: number
  wordCount: number
  isForum: boolean
}

export interface Domain{
  domainId: number
  domainName: string
  domainAge: number
  noOfKeywords: number
  totalPosts: number
  isForum: boolean
}