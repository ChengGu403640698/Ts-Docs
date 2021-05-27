// AddTodoItem -- 页面组件 -- '/addItem'

// 页面结构:
// HEADER--组件: 已处理的
// 添加内容

import React, { useState } from 'react'
import Header from './Header'
import personIcon from './icons/person.png'
import clockIcon from './icons/alarm.png'
import { titlePlaceholder } from './utils'
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
    const [memo, setMemo] = useState("")
    const [attachedFiles] = useState([])
    const [otherParticipants] = useState([person])
    const [showRest, setShowRest] = useState(false)

    const checkAllDone = () => {
        if (!title) return false;
        return true;
    }

    const handleAddMemo = (event: any) => {
        setMemo(event.target.value);
    }

    const handleEditDone = () => {
        if (!checkAllDone()) {
            alert("Please check!")
        } else {
            handleAddItem(new RealTask({
                Id: "",
                Title: title,
                Person: person,
                ExpireTime: expire,
                Memo: memo,
                AttachedFiles: attachedFiles,
                OtherParticipants: otherParticipants,
            }))
            document.getElementById("gotoMain")!.click();
        }
    }

    return (<>
        <div className="relative-position">
            <Header targetPath="/" title="添加待办" id="gotoMain" />
            <button
                className="absolute-position button-style"
                style={{ top: "20px", right: "20px" }}
                onClick={handleEditDone}>完成</button>
        </div>
        <div className="bar-area">
            <textarea
                value={title}
                onChange={(e) => { setTitle(e.target.value) }}
                className="textarea"
                placeholder={titlePlaceholder[Math.floor(Math.random() * titlePlaceholder.length)]}></textarea>
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
            <DatePicker
                showTime={true}
                format="yyyy-MM-dd HH:mm"
                onOk={(moment) => {
                    setExpire(moment.toDate())
                }} />
        </div>
        <div>
            {showRest ?
                (<>
                    <div className="bar-area">
                        <input type="text" placeholder="添加备注"
                            onBlur={handleAddMemo} />
                    </div>
                    <div className="bar-area">
                        附件
                    </div>
                    {/* 不知如何上传附件 */}
                    <div className="bar-area">
                        参与人： {otherParticipants.length}人</div>
                </>)
                :
                (<div className="bar-area">
                    <span style={{
                        color: "lightBlue"
                    }}
                        onClick={() => { setShowRest(true) }}>显示全部</span>
                </div>)
            }
        </div>

    </>)
}

export default AddTodoItem;