import React from 'react'
import { Task, TodoItemStatusType } from './types'
import TodoItem from './TodoItem'
import rightIcon from "./icons/right.png";
import downIcon from "./icons/down.png";
import "./styles/style.less"

interface TodoItemListProps {
    freshTasksList: (item: Task) => void
    description: TodoItemStatusType,
    list: Task[],
}


export default class TodoItemList extends React.Component<TodoItemListProps, {}> {
    ifshowList: boolean = false;
    Icon = rightIcon;

    constructor(props: TodoItemListProps) {
        super(props);
    }

    handleItemFinished(item: Task) {
    }

    handleClickHide() {
        this.Icon = this.Icon == downIcon ? rightIcon : downIcon;
        this.ifshowList = !this.ifshowList;
    }
    freshTasksList(item: Task): void {
        this.props.freshTasksList(item);
    }
    render() {
        return (<div className="todo-item-list">
            <div onClick={this.handleClickHide.bind(this)}>
                <img className="icon" src={this.Icon} alt="down" />
                <b>{this.props.description}</b>
            </div>
            {/* 要渲染的列表 */}
            <div className={this.ifshowList ? "show" : "hide"}>
                {
                    this.props.list.map((item) => {
                        return <TodoItem
                            description={this.props.description}
                            key={item.Title}
                            item={item}
                            freshTasksList={this.freshTasksList.bind(this)}
                        />
                    })
                }
            </div>
        </div>)
    }
}
//注意渲染列表中此时的key不是很合适