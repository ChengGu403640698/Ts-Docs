import React from 'react'
import TodoItemList from './TodoItemList'
import { anyobj, Task, TimerType, RealTask, PersonInfo } from './types'
import './styles/style.less'
import { Link } from 'react-router-dom'
import AddBtn from './icons/add.png'

const DayLength: number = 60 * 24 * 60 * 1000;

export interface TodoStates {
    TasksList: Task[];
    FinishedList: Task[];
    currentTime: number;
}

// produce test data
function produceData(): Task[] {

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


class TodoComponent extends React.Component<anyobj, TodoStates> {

    timer: TimerType | null = null;
    state: TodoStates = {
        TasksList: [],
        currentTime: Date.now(),
        FinishedList: [],
    }

    componentDidMount() {
        this.setState({
            TasksList: produceData()
        }, () => { console.dir(this.state.TasksList) })

        this.timer = setInterval(() => {
            this.setState({
                currentTime: Date.now()
            })
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer!);
    }

    private getExpireTasks(): Task[] {
        const currentTime = this.state.currentTime;
        return this.state.TasksList.filter((item) => {
            return item.ExpireTime.getTime() < currentTime;
        })
    }

    private getIn7DaysTasks(): Task[] {
        const currentTime = this.state.currentTime;
        return this.state.TasksList.filter((item) => {
            return item.ExpireTime.getTime() <= (currentTime + 7 * DayLength)
                && item.ExpireTime.getTime() >= currentTime;
        })
    }

    private getFutureComingTask(): Task[] {
        const currentTime = this.state.currentTime;
        return this.state.TasksList.filter((item) => {
            return item.ExpireTime.getTime() > (currentTime + 7 * DayLength);
        })
    }

    handleItemFinished(target: Task) {
        let { TasksList, FinishedList } = this.state;
        TasksList = TasksList.filter((item: Task) => {
            return item != target;
        })
        FinishedList.push(target);
        this.setState({
            TasksList,
            FinishedList
        })
    }

    render() {
        return (<>
            <TodoItemList
                description={"已逾期"}
                list={this.getExpireTasks()}
                handleItemFinished={this.handleItemFinished.bind(this)}
            />
            <TodoItemList
                description={"未来七天"}
                list={this.getIn7DaysTasks()}
                handleItemFinished={this.handleItemFinished.bind(this)}
            />
            <TodoItemList
                description={"以后"}
                list={this.getFutureComingTask()}
                handleItemFinished={this.handleItemFinished.bind(this)}
            />
            <div className="inline-center">
                <Link to="/VisitFinished" >
                    {"已处理的待办 >"}
                </Link>
            </div>
            <Link to="/VisitFinished">
                <img className="add-btnicon" src={AddBtn} alt="Add TodoItem" />
            </Link>

        </>)
    }
}

export default TodoComponent