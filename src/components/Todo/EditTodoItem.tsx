// FinishedItemList -- 页面组件 -- '/editItem'

// 页面结构:
// HEADER--组件: 已处理的
// Edit的内容

import React from 'react'
import qs from 'query-string'
import Header from './Header'
import { Task, EmergyLeval } from './types'
import personIcon from './icons/person.png'
import priorityIcon from './icons/priority-high.png'
import participantIcon from './icons/participants.png'
import memoIcon from './icons/memo.png'
import clockIcon from './icons/clock.png'
import './styles/style.less'

interface EditTodoItemProps {
    TasksList: Task[];
    handleRefreshTasksList: (index: number, newVal: Task) => void;
}
type EditTodoItemState = Task;

class EditTodoItem extends React.Component<EditTodoItemProps, EditTodoItemState> {

    target: EditTodoItemState | undefined = undefined
    index: number = -1;

    constructor(props: EditTodoItemProps) {
        super(props);
        this.props.TasksList.forEach((item, index) => {
            if (qs.stringify(item) == globalThis.location.search.slice(1)) {
                this.target = this.props.TasksList[index];
                this.index = index;
            }
        })
    }

    componentDidMount() {
        this.setState({
            ...this.target!
        })
    }
    componentWillUnmount() {
        this.props.handleRefreshTasksList(this.index, { ...this.state });
    }

    render() {
        return this.state &&
            (<>
                <Header targetPath="/" title="编辑待办" ></Header>
                <div className="edit-block">
                    <div className="item">
                        <h1><input type="checkbox"
                            checked={this.state.ifFinished}
                            onChange={
                                (e) => {
                                    console.log(e.target.value);
                                    this.setState({
                                        ifFinished: e.target.checked
                                    })
                                }
                            }
                        />{this.state.Title}</h1>
                    </div>
                    <div className="item">
                        <img
                            src={personIcon}
                            alt="personIcon"
                            className="icon"
                            style={
                                {
                                    boxSizing: "content-box"
                                }
                            } />
                        执行人: <input type="text" value={this.state.Person.Name} />
                    </div>
                    <div className="item">
                        <img
                            src={clockIcon}
                            alt="clockIcon"
                            className="icon"
                            style={
                                {
                                    boxSizing: "content-box"
                                }
                            } />
                        {this.state.ExpireTime.toLocaleDateString() + "截止"}
                    </div>
                    <div className="item">
                        <img
                            src={memoIcon}
                            alt="memoIcon"
                            className="icon"
                            style={
                                {
                                    boxSizing: "content-box"
                                }
                            } />备注:
                        <input type="text"
                            value={this.state.Memo}
                            placeholder="点此添加备注"
                            onChange={(e) => {
                                this.setState({
                                    Memo: e.target.value
                                })
                            }} />
                    </div>
                    <div className="item">
                        <img
                            src={priorityIcon}
                            alt="priorityIcon"
                            className="icon"
                            style={
                                {
                                    boxSizing: "content-box"
                                }
                            } />
                        <select
                            name={"priority"}
                            value={this.state.EmergyLeval}
                            onChange={(e) => {
                                this.setState(
                                    { EmergyLeval: e.target.value as EmergyLeval }
                                );
                            }}>
                            <option value="Low">较低</option>
                            <option value="Normal">普通</option>
                            <option value="Urgent">紧急</option>
                            <option value="ExtremeUrgent">非常紧急</option>
                        </select>
                    </div>
                    <div className="item">
                        <img
                            src={participantIcon}
                            alt="participantIcon"
                            className="icon"
                            style={
                                {
                                    boxSizing: "content-box"
                                }
                            } />
                        参与人:<span>{this.state.Person.Name}</span>
                    </div>

                </div>
            </>)
    }
}

export default EditTodoItem