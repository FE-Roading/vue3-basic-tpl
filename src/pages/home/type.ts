export enum CheckedStatus {
  succeeded,
  failed,
  pending
}

export type PassedItemType = {
  title: string
  status: CheckedStatus
}

export type ProblemsRankOfBad = {
  index: number
  title: string
  count: number
}