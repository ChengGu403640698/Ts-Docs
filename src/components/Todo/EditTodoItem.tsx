import React from 'react'
import qs from 'query-string'

import {Task} from './types'
import './styles/style.less'
import personIcon from './icons/person.png'
import priorityIcon from './icons/priority-high.png'
import participantIcon from './icons/participants.png'
import memoIcon from './icons/memo.png'
import clockIcon from './icons/clock.png'
import alarmIcon from './icons/alarm.png'

interface EditTodoItemProps{
    TasksList:Task[];
}

// interface EditTodoItemState{
    
// }

//这个组件需要根据路由变化相应更新
class EditTodoItem extends React.Component<EditTodoItemProps, any> {
    currentTask : Task | undefined = undefined
    constructor(props:EditTodoItemProps){
        super(props);
        this.props.TasksList.forEach((item,index)=>{
            if(qs.stringify(item) == globalThis.location.search.slice(1)){
                this.currentTask = this.props.TasksList[index]
            }  
        })
    }

    render() {
        return this.currentTask && 
        (<>
            <div className="edit-block">
                <div className = "item">
                    <h1>{this.currentTask.Title}</h1>
                </div>
                <div className = "item">
                    <img src={personIcon} alt="" /> 执行人: <input type="text" value={this.currentTask.Person.Name}/>
                </div>
                <div className = "item">
                <img src={clockIcon} alt="" /> {this.currentTask.ExpireTime.toLocaleDateString() + "截止"}
                </div>
                <div className = "item">
                    <img src={memoIcon} alt="" />备注: <input type="text" value={this.currentTask.Memo} placeholder="点此添加备注"/>
                </div>
                <div className = "item">
                    <img src={alarmIcon} alt="" />
                    <select name="priority" id="low">
                        <option value="low">较低</option>
                        <option value="normal">普通</option>
                        <option value="urgent">紧急</option>
                        <option value="extremeUrgent">非常紧急</option>
                    </select>
                </div>
                <div className = "item">
                    <img src={participantIcon} alt="" />参与人:<span>{this.currentTask.Person.Name}</span>
                </div>
            </div>
        </>)
    }
}

export default EditTodoItem