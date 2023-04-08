export interface FAQVariables {
  language: string
}

export interface FAQresultData {
  author_id: number
  body: string
  comments_disabled: boolean
  content_tag_ids: any
  created_at: string
  draft: boolean
  edited_at: string
  html_url: string
  id: number
  label_names: any
  locale: string
  name: string
  outdated: boolean
  outdated_locales: any
  permission_group_id: number
  position: number
  promoted: boolean
  section_id: number
  source_locale: string
  title: string
  updated_at: string
  url: string
  user_segment_id: number
  vote_count: number
  vote_sum: number
}
export interface FAQResult {
  message: string
  success: boolean
  result?: FAQresultData[]
}
