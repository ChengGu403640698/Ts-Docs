import { Task, PersonInfo, RealTask } from './types'

export const DayLength: number = 60 * 24 * 60 * 1000;
export const person: PersonInfo = {
    Name: "顾承（我）",
    Id: "00001",
}
export function produceData(): Task[] {

    let TestData: Task[] = [];
    const person1: PersonInfo = person
    TestData.push(new RealTask({
        Title: "Task1",
        Person: person1,
        ExpireTime: new Date(Date.now() + DayLength),
    }))
    TestData.push(new RealTask({
        Title: "Task2",
        Person: person1,
        ExpireTime: new Date(Date.now() + 2 * DayLength),
        Memo: "Must do it",
    }))
    TestData.push(new RealTask({
        Title: "Task3",
        Person: person1,
        ExpireTime: new Date(Date.now() + 10 * DayLength),
        Memo: "Must do it",
    }))
    return TestData;
}
export const titlePlaceholder: Array<string> = [
    "例如：今天管理本周的工作计划",
    "例如: 后天下午发起项目启动会",
    "例如: 下午17点完成工作日报",
    "例如: 今晚看一小时书",
    "例如: 明早学一小时英语",
    "例如: 三天后整理项目复盘报告",
    "例如: 周五下午整理客户资料",
    "例如: 明天走访客户整理需求",
    "例如: 下周组织团队学习业务知识"
]