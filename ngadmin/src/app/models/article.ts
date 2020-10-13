export interface ArticleContactData {
  title: string
  firstRow: string
  secondRow: string
  link: string
}

export interface Article {
  id?: number
  title: string
  alias: string
  contentType: 'double' | 'single'
  singleContent: string
  textLeft: string
  textRight: string
  customData?: ArticleContactData | null
}
