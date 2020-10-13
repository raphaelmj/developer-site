export interface Contact {
  id?: number
  name: string
  who: string
  email: string
  phone: string
  asFirst: boolean
  status: boolean
  ordering: number | null
  createdAt?: Date
  updatedAt?: Date
}
