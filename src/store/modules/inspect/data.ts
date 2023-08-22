import { InspectItemType, CheckedStatus, MockInspectFailedItemType, BadProblemsRankItemType } from "./type"
import failedLeftFront from "@/assets/images/inspect/failed-left-front.png"
import failedRightFront from "@/assets/images/inspect/failed-right-front.png"

const allInspectItems: InspectItemType[] = [
  {
    id: 1,
    title: "前保",
    status: CheckedStatus.pending,
    module: "车头检测",
  },
  {
    id: 2,
    title: "前档",
    status: CheckedStatus.pending,
    module: "车头检测",
  },
  {
    id: 3,
    title: "雨刮",
    status: CheckedStatus.pending,
    module: "车头检测",
  },
  {
    id: 4,
    title: "前标",
    status: CheckedStatus.pending,
    module: "车头检测",
  },
  {
    id: 5,
    title: "右前车轮",
    status: CheckedStatus.pending,
    module: "右侧检测",
  },
  {
    id: 6,
    title: "右后车轮",
    status: CheckedStatus.pending,
    module: "右侧检测",
  },
  {
    id: 7,
    title: "右前车窗",
    status: CheckedStatus.pending,
    module: "右侧检测",
  },
  {
    id: 8,
    title: "右后车窗",
    status: CheckedStatus.pending,
    module: "右侧检测",
  },
  {
    id: 9,
    title: "右前车门",
    status: CheckedStatus.pending,
    module: "右侧检测",
  },
  {
    id: 10,
    title: "右后车门",
    status: CheckedStatus.pending,
    module: "右侧检测",
  },
  {
    id: 11,
    title: "右后视镜",
    status: CheckedStatus.pending,
    module: "右侧检测",
  },
  {
    id: 12,
    title: "左前车轮",
    status: CheckedStatus.pending,
    module: "左侧检测",
  },
  {
    id: 13,
    title: "左后车轮",
    status: CheckedStatus.pending,
    module: "左侧检测",
  },
  {
    id: 14,
    title: "左前车窗",
    status: CheckedStatus.pending,
    module: "左侧检测",
  },
  {
    id: 15,
    title: "左后车窗",
    status: CheckedStatus.pending,
    module: "左侧检测",
  },
  {
    id: 16,
    title: "左前车门",
    status: CheckedStatus.pending,
    module: "左侧检测",
  },
  {
    id: 17,
    title: "左后车门",
    status: CheckedStatus.pending,
    module: "左侧检测",
  },
  {
    id: 18,
    title: "左后视镜",
    status: CheckedStatus.pending,
    module: "左侧检测",
  },
  {
    id: 19,
    title: "天窗",
    status: CheckedStatus.pending,
    module: "车顶检测",
  },
  {
    id: 20,
    title: "行李架",
    status: CheckedStatus.pending,
    module: "车顶检测",
  },
  {
    id: 21,
    title: "鲨鱼鳍",
    status: CheckedStatus.pending,
    module: "车顶检测",
  },
  {
    id: 22,
    title: "车尾灯",
    status: CheckedStatus.pending,
    module: "车尾检测",
  },
  {
    id: 23,
    title: "车尾标",
    status: CheckedStatus.pending,
    module: "车尾检测",
  },
  {
    id: 24,
    title: "后保",
    status: CheckedStatus.pending,
    module: "车尾检测",
  },
  {
    id: 25,
    title: "尾箱标牌",
    status: CheckedStatus.pending,
    module: "车尾检测",
  },
  {
    id: 26,
    title: "扰流板",
    status: CheckedStatus.pending,
    module: "车尾检测",
  },
]

export function getInspectItems(): InspectItemType[] {
  return JSON.parse(JSON.stringify(allInspectItems))
}

export const mockedFailedItems: MockInspectFailedItemType[] = [
  {
    id: 12,
    problem: "左侧前轮没有装雷达",
    image: failedLeftFront
  },
  {
    id: 5,
    problem: "右侧前轮没有装雷达",
    image: failedRightFront
  }
]

const badRankProblems: BadProblemsRankItemType[] = [
  {
    index: 1,
    title: "左后门框凸包",
    count: 3,
  },
  {
    index: 2,
    title: "车头灯类型错误",
    count: 2,
  },
  {
    index: 2,
    title: "行李架颜色错误",
    count: 3,
  },
  {
    index: 1,
    title: "左前门内板胶线不平",
    count: 2,
  },
  {
    index: 1,
    title: "EMK标识错误",
    count: 2,
  },
  {
    index: 1,
    title: "左前保和日行灯有干涉",
    count: 2,
  },
  {
    index: 1,
    title: "泊箱盖标签错贴",
    count: 2,
  },
  {
    index: 1,
    title: " 左侧尾灯有划痕",
    count: 1,
  },
  {
    index: 1,
    title: "右后视镜有凹陷",
    count: 1,
  },
  {
    index: 1,
    title: "方向盘调节费力 ",
    count: 1,
  }
].sort((a, b) => b.count - a.count).map((item, index) => ({ ...item, index: index + 1 }))

export const mockedBadRankProblems = badRankProblems