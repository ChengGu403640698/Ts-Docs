import React from 'react'
import { Link } from 'react-router-dom'
import TodoItem from './TodoItem'
import { Task } from './types'
import back from './icons/back.png'
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
            <Link to="/"><img src={back} className="icon" alt="back" /> Back</Link>
            {
                this.state.TasksList.map((item: Task) =>
                    <TodoItem key={item.Title} description="已完成" item={item} />)
            }
        </>
    }
}