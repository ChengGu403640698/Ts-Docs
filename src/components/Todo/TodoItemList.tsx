import React from 'react'
import { Task, TodoItemStatusType } from './types'
import TodoItem from './TodoItem'
import rightIcon from "./icons/right.png";
import downIcon from "./icons/down.png";
import "./styles/style.less"

interface TodoItemListProps {
    description: TodoItemStatusType,
    list: Task[],
    handleItemFinished: (item: Task) => void
}


export default class TodoItemList extends React.Component<TodoItemListProps, {}> {
    ifshowList: boolean = false;
    Icon = rightIcon;

    constructor(props: TodoItemListProps) {
        super(props);
    }

    handleItemFinished(item: Task) {
        this.props.handleItemFinished(item)
    }

    handleClickHide() {
        this.Icon = this.Icon == downIcon ? rightIcon : downIcon;
        this.ifshowList = !this.ifshowList;
    }

    render() {
        return (<>
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
                            itemFinished={this.handleItemFinished.bind(this)}
                        />
                    })
                }
            </div>
        </>)
    }
}
//注意渲染列表中此时的key不是很合适