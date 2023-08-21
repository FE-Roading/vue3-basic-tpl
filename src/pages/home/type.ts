export enum CheckedStatus {
  succeeded,
  failed,
  pending
}

export type PassedItemType = {
  id: number
  title: string
  status: CheckedStatus
  problem?: string
  image?: string
}

export type ProblemsRankOfBad = {
  index: number
  title: string
  count: number
}