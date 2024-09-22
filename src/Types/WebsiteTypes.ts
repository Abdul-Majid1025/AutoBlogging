import { Keyword } from "./KeywordTypes"

export interface WebsiteState{
  websites: Website[]
  posts: Post[]
  categories: Category[]
  siteKeywords: Keyword[]
}

export interface Website{
  websiteId: number
  websiteName: string
  websiteImage: string
  domain: string
  userName: string
  password: string
}

export interface Post{
  postId: number
  title: string
  postUrl: string
  postText: string
  isPublished: boolean
  keyword: string
  category: number
  website: number
}

export interface Category{
  categoryId: number
  categoryName: string
  website: number
}
