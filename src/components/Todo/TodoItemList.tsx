// TodoItemList -- 元素组件 -- 首页的一部分

// 结构如下：
// 标题: "已逾期"| "未来七天"| "以后"
// TodoItem 列表

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
interface TodoItemListState{
    ifshowList: boolean;
    Icon:typeof rightIcon;
}

export default class TodoItemList extends React.Component<TodoItemListProps, TodoItemListState> {
    state:TodoItemListState = {
        ifshowList:  false,
        Icon : rightIcon,
    }

    constructor(props: TodoItemListProps) {
        super(props);
    }

    handleItemFinished(item: Task) {
    }

    handleClickHide() {
        this.setState({
            Icon: this.state.Icon == downIcon ? rightIcon : downIcon,
            ifshowList: !this.state.ifshowList,
        })
    }
    freshTasksList(item: Task): void {
        this.props.freshTasksList(item);
    }
    render() {
        return (<div className="todo-item-list">
            <div onClick={this.handleClickHide.bind(this)}>
                <img className="icon" src={this.state.Icon} alt="down" />
                <b>{this.props.description}</b>
            </div>
            {/* 要渲染的列表 */}
            <div className={this.state.ifshowList ? "show" : "hide"}>
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
// 这里暂时没处理今天明天的时间显示逻辑