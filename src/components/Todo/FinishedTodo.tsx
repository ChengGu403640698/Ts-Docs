import React from 'react'
import Header from './Header'
import TodoItem from './TodoItem'
import { Task } from './types'
interface FinishedTodoProps {
    TasksList: Task[],
}
interface FinishedTodoState {
    TasksList: Task[],
}
export default class FinishedTodo extends React.Component<FinishedTodoProps, FinishedTodoState> {
    state = {
        TasksList: []
    }

    componentDidMount() {
        this.setState(
            {
                TasksList: this.props.TasksList.filter((item) => {
                    return item.ifFinished;
                })
            }
        )
    }

    render() {
        return <>
            <Header targetPath="/" title="已处理的" />
            {
                this.state.TasksList.map((item: Task) =>
                    <TodoItem key={item.Title} description="已完成" item={item} />)
            }
        </>
    }
}