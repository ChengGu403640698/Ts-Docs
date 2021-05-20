export type anyobj = Record<string, any>;
export interface PersonInfo {
    Name: string,
    Id: string,
    [props: string]: any,
}

export interface Task {
    Title: string,
    Person: PersonInfo,
    ExpireTime: Date,
    ifFinished?: boolean,
    Memo?: string,
    AttachedFiles?: Array<File>;
    OtherParticipants?: Array<string>;
}
export class RealTask {
    Title: string
    Person: PersonInfo
    ExpireTime: Date
    ifFinished?: boolean
    Memo?: string
    AttachedFiles?: Array<File>
    OtherParticipants?: Array<string>
    constructor(param: Task) {
        this.ifFinished = false;
        this.Title = param.Title;
        this.Person = param.Person;
        this.ExpireTime = param.ExpireTime;
        this.Memo = param.Memo;
        this.AttachedFiles = param.AttachedFiles;
        this.OtherParticipants = param.OtherParticipants;
    }
}

export type TimerType = ReturnType<typeof setInterval>;

export enum DayDict {
    "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"
}
export type TodoItemStatusType = "已逾期" | "未来七天" | "以后" | "已完成";