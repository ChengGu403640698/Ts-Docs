// 函数组件 + react-hooks
import React, {FC, useState, useEffect } from'react'

type setIntervalRetunrType= ReturnType<typeof setInterval>;

const Component2:FC<any> = ()=>{

  let [text,setText] = useState("Initial");
  let [currentTime,setCurrentTime] = useState(new Date().toLocaleTimeString());
  let timer : setIntervalRetunrType | null = null;

  useEffect(()=>{
    timer = setInterval(()=>{
      setCurrentTime(new Date().toLocaleTimeString());
      return ()=>{
        clearInterval(timer!);
      }
    },1000)
  },[])

  return (
    <div>
      Component2: {text}
      <button onClick = {()=>{setText(currentTime)}}>Change</button>
    </div>
  )

} 

export default Component2;