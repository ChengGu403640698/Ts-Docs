import React from 'react'
import TodoItemList from './TodoItemList'
import { Task, TimerType } from './types'
import { DayLength } from './global'
import './styles/style.less'
import { Link } from 'react-router-dom'
import AddBtn from './icons/add.png'


interface TodoComponentProps {
    freshTasksList: (item: Task) => void,
    TasksList: Task[];
}
interface TodoStates {
    TasksList: Task[];
    currentTime: number;
}

class TodoComponent extends React.Component<TodoComponentProps, TodoStates> {

    timer: TimerType | null = null;
    state: TodoStates = {
        TasksList: [],
        currentTime: Date.now(),
    }

    componentDidMount() {
        this.setState({
            TasksList: this.props.TasksList.filter((item) => {
                return !item.ifFinished;
            })
        })
        this.timer = setInterval(() => {
            this.setState({
                currentTime: Date.now()
            })
        }, 1);
        // 很奇怪这个数字一大就展开很慢，不知道为啥
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
    freshTasksList(item: Task): void {
        this.props.freshTasksList(item);
    }

    render() {
        return (<>
            <TodoItemList
                description={"已逾期"}
                list={this.getExpireTasks()}
                freshTasksList={this.freshTasksList.bind(this)}
            />
            <TodoItemList
                description={"未来七天"}
                list={this.getIn7DaysTasks()}
                freshTasksList={this.freshTasksList.bind(this)}
            />
            <TodoItemList
                description={"以后"}
                list={this.getFutureComingTask()}
                freshTasksList={this.freshTasksList.bind(this)}
            />
            <div className="inline-center">
                <Link to="/VisitFinished" >
                    {"已处理的待办 >"}
                </Link>
            </div>
            <Link to="/addItem">
                <img className="add-btnicon" src={AddBtn} alt="Add TodoItem" />
            </Link>

        </>)
    }
}

export default TodoComponent