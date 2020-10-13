export interface PointChild {
  name: string
  address: string
  status: 'plan-invest' | 'open-invest'
  cloudLeft: string
  cloudTopBottom: string
  openTo: "top" | "bottom"
  url: string
  investId: number
  isShow?: boolean
}


export interface Point {
  id?: number
  name: string
  left: string
  top: string
  cityLeft: string
  cityTop: string
  status: 'plan-invest' | 'open-invest'
  type: 'single' | 'collection',
  size: 'big' | 'small'
  child: PointChild
  childs: PointChild[]
  isShow: boolean
  ordering: number
}
