export enum CheckedStatus {
  succeeded,
  failed,
  pending
}

export type PassedItemType = {
  title: string
  status: CheckedStatus
}