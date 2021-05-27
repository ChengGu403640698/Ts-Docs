// TodoItem -- 元素组件 -- TodoItemList和FinishedItemList的一部分
// 结构如下：
// 标题: "已逾期"| "未来七天"| "以后"
// TodoItem 列表

import React from 'react'
import { Link } from 'react-router-dom'
import qs from 'query-string'
import { Task, DayDict, TodoItemStatusType } from './types'
import './styles/style.less'
import { alertTextColor, normalTextColor, normalBlue } from './utils'

interface TodoItemProps {
    makeItemFinished?: (item: Task) => void;
    description: TodoItemStatusType,
    item: Task;
}

export default class TodoItem extends React.Component<TodoItemProps> {

    handleBtnClickItemFinished(): void {
        this.props.makeItemFinished!(this.props.item);
    }

    calculateDateText(): string {

        const expireTime = this.props.item.ExpireTime;
        switch (this.props.description) {
            case "已逾期": return expireTime.toDateString() + "  过期";
            case "未来七天": return DayDict[expireTime.getDay()] + "  截止";
            case "以后": return expireTime.toDateString() + "  截止";
        }
        return "";
    }

    calculateTextColor(): string {
        if (this.props.description == "已逾期") return alertTextColor;
        return normalTextColor;
    }

    render() {
        return (
            <div className="relative-position todo-content-box">
                <Link to={`/editItem?${qs.stringify(this.props.item)}`}>
                    <div style={{ height: "80px" }}>
                        <span style={{ color: normalBlue }}>
                            {this.props.item.Person.Name}
                        </span>
                        <span style={{ color: normalTextColor }}>
                            {this.props.item.Title}
                        </span>
                        <span className="absolute-position"
                            style={{
                                color: this.calculateTextColor(),
                                right: "10px",
                                top: "5px",
                            }}>{this.calculateDateText()}
                        </span>
                    </div>
                </Link>
                <button
                    disabled={this.props.item.ifFinished}
                    className={`${this.props.item.ifFinished ? 'button-styleok' : 'button-style'} absolute-position`}
                    style={{
                        right: "10px",
                        bottom: "10px",
                    }}
                    onClick={this.handleBtnClickItemFinished.bind(this)}>完成
            </button>
            </div>
        )
    }
}