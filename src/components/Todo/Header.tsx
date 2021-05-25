import React from 'react'
import { Link } from 'react-router-dom'
import backIcon from './icons/back.png'
interface HeaderProps {
    targetPath: string;
    title: string;
    id?: string;
}
const Header: React.FC<HeaderProps> = ({ targetPath, title, id }) => {
    return (<div style={{
        paddingTop: "20px",
        backgroundColor: "white"
    }} className="bar-area">
        <Link to={targetPath}><img src={backIcon} height="10px" width="10px" alt="back" /><span id={id}>返回</span></Link>
        <b style={
            {
                marginLeft: "30%",
                fontSize: "15px"
            }
        }>{title}</b>
    </div>)
}
export default Header