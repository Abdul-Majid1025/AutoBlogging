
const BASE_URL = 'http://127.0.0.1:8000/'

export const API: Record<string, string> = {
  CREATE_REPORT: `${BASE_URL}create-report/`,
  GET_REPORTS: `${BASE_URL}get-reports/`,
  DELETE_REPORTS: `${BASE_URL}delete-reports/`,
  KEYWORDS_TO_REPORT: `${BASE_URL}keywords-to-report/`,
  GET_KEYWORDS: `${BASE_URL}get-keywords/`,
  IMPORT_KEYWORDS: `${BASE_URL}import-keywords/`,
  UPLOAD_KEYWORDS: `${BASE_URL}upload-keywords/`,
  DELETE_KEYWORDS: `${BASE_URL}delete-keywords/`,
  GET_DOMAINS: `${BASE_URL}get-domains/`,
  GET_VOLUME: `${BASE_URL}get-volume/`,
  GET_SERP_SCORE: `${BASE_URL}get-serp-score/`,
  REMOVE_DUPLICATE_KEYWORDS: `${BASE_URL}remove-duplicate-keywords/`,

  ADD_WEBSITE: `${BASE_URL}add-website/`,
  GET_WEBSITES: `${BASE_URL}get-websites/`,
  DELETE_WEBSITE: `${BASE_URL}delete-website/`,
  ADD_CATEGORY: `${BASE_URL}add-category/`,
  GET_CATEGORIES: `${BASE_URL}get-categories/`,
  KEYWORDS_TO_SITE: `${BASE_URL}keywords-to-site/`,
  GET_SITE_KEYWORDS: `${BASE_URL}get-site-keywords/`,
  CREATE_POST: `${BASE_URL}create-post/`,
  GET_POSTS: `${BASE_URL}get-posts/`,
  PUBLISH_POSTS: `${BASE_URL}publish-posts/`,
}