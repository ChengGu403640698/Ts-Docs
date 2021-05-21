import {Task,PersonInfo,RealTask} from './types'

export const DayLength :number = 60 * 24 * 60 * 1000;

export function produceData(): Task[] {

  let TestData: Task[] = [];
  const person1: PersonInfo = {
      Name: "顾承（我）",
      Id: "00001",
  }
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