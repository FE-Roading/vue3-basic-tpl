export enum CheckedStatus {
  succeeded,
  failed,
  pending
}

export type InspectItemType = {
  id: number
  title: string
  status: CheckedStatus
  module: string
  problem?: string
  image?: string
}

export type MockInspectFailedItemType = Required<Pick<InspectItemType, "id" | "image" | "problem">>

export type BadProblemsRankItemType = {
  index: number
  title: string
  count: number
}