export type anyobj = Record<string, any>;
export interface PersonInfo {
    Name: string,
    Id: string,
    [props: string]: any,
}
export type EmergyLeval = 'Low' | "Normal" | "Urgent" | 'ExtremeUrgent';
export interface Task {
    Title: string,
    Person: PersonInfo,
    ExpireTime: Date,
    ifFinished?: boolean,
    Memo?: string,
    AttachedFiles?: Array<File>;
    OtherParticipants?: Array<PersonInfo>;
    EmergyLeval?: EmergyLeval;
}
export class RealTask {
    Title: string = "";
    Person: PersonInfo
    ExpireTime: Date
    ifFinished: boolean = false;
    Memo: string = ""
    AttachedFiles: Array<File> = []
    OtherParticipants: Array<PersonInfo> = []
    EmergyLeval: EmergyLeval = "Low"
    constructor(param: Task) {
        this.Title = param.Title;
        this.Person = param.Person;
        this.ExpireTime = param.ExpireTime;
        this.Memo = param.Memo ? param.Memo : this.Memo;
        this.AttachedFiles = param.AttachedFiles ? [...param.AttachedFiles] : this.AttachedFiles;
        this.OtherParticipants = param.OtherParticipants ? [...param.OtherParticipants] : this.OtherParticipants;
        this.EmergyLeval = param.EmergyLeval ? param.EmergyLeval : this.EmergyLeval;
    }
}

export type TimerType = ReturnType<typeof setInterval>;

export enum DayDict {
    "星期一" = 1, "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"
}
export type TodoItemStatusType = "已逾期" | "未来七天" | "以后" | "已完成";

export const DayLength: number = 60 * 24 * 60 * 1000;