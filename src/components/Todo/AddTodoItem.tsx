import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import personIcon from './icons/person.png'
import clockIcon from './icons/alarm.png'
import { titlePlaceholder } from './global'
import { PersonInfo } from './types'
import { DatePicker } from 'antd'
import 'antd/lib/date-picker/style/css'
import './styles/style.less'
import { Task, RealTask } from './types'


interface AddTodoItemProps {
    person: PersonInfo,
    handleAddItem: (item: Task) => void,
}
const AddTodoItem: React.FC<AddTodoItemProps> = ({ person, handleAddItem }) => {
    const [expire, setExpire] = useState(new Date())
    const [title, setTitle] = useState("")
    const checkAllDone = () => {
        if (!title) return false;
        return true;
    }
    return (<>
        <div className="relative-position">
            <Header
                targetPath="/"
                title="添加待办"
                id="gotoMain" />
            <button
                className="absolute-position button-styleok"
                style={{
                    top: "20px",
                    right: "20px"
                }}
                onClick={() => {
                    if (!checkAllDone()) {
                        alert("Please check!")
                    } else {
                        handleAddItem(new RealTask({
                            Title: title,
                            Person: person,
                            ExpireTime: expire,
                        }))
                        console.dir(document.getElementById("gotoMain"))
                        document.getElementById("gotoMain")!.click();
                    }
                }}>完成</button>
        </div>

        <div className="bar-area">
            <textarea
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value)
                }}
                className="textarea"
                placeholder={
                    titlePlaceholder[Math.floor(Math.random() * titlePlaceholder.length)]
                }></textarea>
        </div>
        <div className="bar-area">
            <img
                src={personIcon}
                alt="personIcon"
                className="icon " />
                执行人:{person.Name}
        </div>
        <div className="bar-area">
            <img
                src={clockIcon}
                alt="clockIcon"
                className="icon " />
            <input type="text" value={expire.toLocaleString()}
                disabled />
            <DatePicker
                showTime={true}
                format="yyyy-MM-dd HH:mm"
                onOk={(moment) => {
                    setExpire(moment.toDate())
                }} />
        </div>
    </>)
}
export default AddTodoItem;
// 感觉这个DatePicker可以自己封装一个, antd不是很好看