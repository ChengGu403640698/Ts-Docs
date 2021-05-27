// TodoItemList -- 元素组件 -- 首页的一部分

// 结构如下：
// 标题: "已逾期"| "未来七天"| "以后"
// TodoItem 列表

import React from 'react'
import TodoItem from './TodoItem'
import rightIcon from "./icons/right.png";
import downIcon from "./icons/down.png";
import { Task, TodoItemStatusType } from './types'
import "./styles/style.less"

interface TodoItemListProps {
    makeItemFinished: (item: Task) => void
    description: TodoItemStatusType,
    list: Task[],
}
interface TodoItemListState {
    ifshowList: boolean; // 用于控制列表是否展开
    Icon: typeof rightIcon;
}

export default class TodoItemList extends React.Component<TodoItemListProps, TodoItemListState> {

    state: TodoItemListState = {
        ifshowList: false,
        Icon: rightIcon,
    }

    handleChangeHideStatus() {
        this.setState({
            Icon: this.state.Icon == downIcon ? rightIcon : downIcon,
            ifshowList: !this.state.ifshowList,
        })
    }

    makeItemFinished(item: Task): void {
        this.props.makeItemFinished(item);
    }

    render() {
        return (
            <div className="todo-item-list">
                <div onClick={this.handleChangeHideStatus.bind(this)}>
                    <img className="icon" src={this.state.Icon} alt="down" />
                    <b>{this.props.description}</b>
                </div>
                {/* 要渲染的列表 */}
                <div className={this.state.ifshowList ? "show" : "hide"}>
                    {
                        this.props.list.map((item) => {
                            return <TodoItem
                                key={item.Id}
                                description={this.props.description}
                                item={item}
                                makeItemFinished={this.makeItemFinished.bind(this)}
                            />
                        })
                    }
                </div>
            </div>
        )
    }
}
//注意渲染列表中此时的key不是很合适
// 这里暂时没处理今天明天的时间显示逻辑