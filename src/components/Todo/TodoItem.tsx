import React from 'react'
import { Task, DayDict, TodoItemStatusType } from './types'
import './styles/style.less'
const alertTextColor = "rgb(213,122,107)";
const normalTextColor = "rgb(109,121,123)"
const normalBlue = "rgb(98, 151, 204)";
const backgroundColor = "white";

interface TodoItemProps {
    freshTasksList?: (item: Task) => void;
    description: TodoItemStatusType,
    item: Task;
}

export default class TodoItem extends React.Component<TodoItemProps, {}> {

    constructor(props: TodoItemProps) {
        super(props);
    }

    handleBtnClickItemFinished(): void {
        this.props.freshTasksList!(this.props.item);
    }

    calculateDateText(): string {
        const expireTime = this.props.item.ExpireTime;
        switch (this.props.description) {
            case "已逾期": return DayDict[expireTime.getDay()] + "  截止";
            case "未来七天": return DayDict[expireTime.getDay()] + "  截止";
            case "以后": return expireTime.getMonth() + "月" + expireTime.getDate() + "日" + "  截止";
        }
        return "";
    }

    calculateTextColor(): string {
        if (this.props.description == "已逾期") return alertTextColor;
        return normalTextColor;
    }
    render() {
        return (<div className="todo-item relatce-position">
            <span style={
                {
                    color: normalBlue,
                    backgroundColor,
                }
            }>
                {this.props.item.Person.Name}
            </span>
            <br />
            <span
                style={
                    {
                        color: normalTextColor,
                        backgroundColor,
                    }}
            >
                {this.props.item.Title}
            </span><br />
            <span
                className="absolute-position"
                style={
                    {
                        color: this.calculateTextColor(),
                        backgroundColor,
                        right: "10px",
                        top: "5px",
                    }}
            >
                {this.calculateDateText()}
            </span><br />
            <button
                disabled={this.props.item.ifFinished}
                className={`${this.props.item.ifFinished ? 'button-styleok' : 'button-style'} absolute-position`}
                style={
                    {
                        right: "10px",
                        bottom: "5px",
                    }}
                onClick={this.handleBtnClickItemFinished.bind(this)}>
                完成
                </button>
        </div >)
    }
}