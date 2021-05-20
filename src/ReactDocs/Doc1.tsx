// 类组件 + 生命周期
import React, {Component} from 'react'
interface Component1State {
  text:string;
  currentTime:string;
}
type setIntervalRetunrType= ReturnType<typeof setInterval>;
class Component1 extends Component<{},Component1State>{
  state = {
    text:"Initial",
    currentTime:new Date().toLocaleTimeString()
  }
  private timer:  setIntervalRetunrType| null = null;
  componentDidMount () {
    this.timer = setInterval(()=>{
      this.setState({
        currentTime:new Date().toLocaleTimeString()
      });
    },1000);
    console.log("componentDidMount");
    // 发现该组件当最初渲染的时候会触发一次DidUpdate
  }
  componentDidUpdate () {
    // console.log("componentDidUpdate");
    // 发现该组件当state发生改变的时候会触发DidUpdate
  }
  componentWillUnmount () {
    clearInterval(this.timer!);
    console.log("componentWillMount");
    // 应该能在页面路由的时候看到这个输出
  }
  hanleBtnClick () {
    this.setState({
      text: this.state.currentTime
    })
  }
  render(){
    return (
      <div>
        Component1: { this.state.text }
        <button onClick = { this.hanleBtnClick.bind(this) }>Change</button>
      </div>
    )
  }
}
export default Component1;