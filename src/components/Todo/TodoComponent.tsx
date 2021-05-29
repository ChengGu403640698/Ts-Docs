// TodoComponent -- 页面组件 -- '/'

// 页面结构:
// HEADER--组件: 待办
// TodoItemList--组件: >已逾期
// TodoItemList--组件: >未来七天
// TodoItemList--组件: >以后

import React from 'react'
import { Link } from 'react-router-dom'

import TodoItemList from './TodoItemList'
import Header from './Header'
import AddBtn from './icons/add.png'

import { Task, TimerType } from './types'
import { DayLength } from './utils'
import './styles/style.less'


interface TodoComponentProps {
    TasksList: Task[];
    makeItemFinished: (item: Task) => void,
}
interface TodoStates {
    TodoTasksList: Task[];
    currentTime: number;
}

class TodoComponent extends React.Component<TodoComponentProps, TodoStates> {

    timer: TimerType | null = null;
    state: TodoStates = {
        TodoTasksList: [],
        currentTime: Date.now(),
    }

    private getExpireTasks(): Task[] {
        const currentTime = this.state.currentTime;
        return this.state.TodoTasksList.filter((item) => {
            return item.ExpireTime.getTime() < currentTime;
        })
    }


    private getIn7DaysTasks(): Task[] {
        const currentTime = this.state.currentTime;
        return this.state.TodoTasksList.filter((item) => {
            return item.ExpireTime.getTime() <= (currentTime + 7 * DayLength)
                && item.ExpireTime.getTime() >= currentTime;
        })
    }

    private getFutureComingTasks(): Task[] {
        const currentTime = this.state.currentTime;
        return this.state.TodoTasksList.filter((item) => {
            return item.ExpireTime.getTime() > (currentTime + 7 * DayLength);
        })
    }

    makeItemFinished(item: Task): void {
        this.props.makeItemFinished(item);
    }

    componentDidMount() {
        this.setState({
            TodoTasksList: this.props.TasksList.filter((item) => {
                return !item.ifFinished;
            })
        })

        this.timer = setInterval(() => {
            this.setState({
                currentTime: Date.now()
            })
        }, 1000 * 60);
        // 暂时设置成1分钟更新一个状态
    }

    componentWillUnmount() {
        clearInterval(this.timer!);
    }

    render() {
        return (<>
            <Header targetPath="/" title="待办" />
            <TodoItemList
                description={"已逾期"}
                list={this.getExpireTasks()}
                makeItemFinished={this.makeItemFinished.bind(this)}
            />
            <TodoItemList
                description={"未来七天"}
                list={this.getIn7DaysTasks()}
                makeItemFinished={this.makeItemFinished.bind(this)}
            />
            <TodoItemList
                description={"以后"}
                list={this.getFutureComingTasks()}
                makeItemFinished={this.makeItemFinished.bind(this)}
            />
            <div className="inline-center">
                <Link to="/VisitFinished" >{"已处理的待办 >"}</Link>
            </div>
            <Link to="/addItem">
                <img className="add-btnicon" src={AddBtn} alt="Add TodoItem" />
            </Link>

        </>)
    }
}

export default TodoComponent