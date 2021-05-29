import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Task } from './components/Todo/types'
import { person } from './components/Todo/utils'
import { TodoComponent as Todo, FinishedItemList, EditTodoItem, AddTodoItem } from './components/Todo'
import Axios from 'axios'

const App: React.FC<{}> = () => {

    // 全局数据 -- data 及其对应的方法 -- setData
    let [data, setData]: [Task[], any] = useState([]);

    // 启动应用的时候请求一次接口
    useEffect(() => {
        Axios.get('http://localhost:1022/getTodoAppData').then((message) => {
            setData(message.data);
        }).catch(() => {
            setData([]);
        })
    }, []);

    // 将对应的App中的全局数据data进行更新
    // 并请求后端对应接口修改数据
    const makeItemFinished = (target: Task) => {

        const datacopy = [...data]

        datacopy.forEach((item, index) => {
            if (item.Id === target.Id) {
                datacopy[index].ifFinished = true;
            }
        })

        setData(datacopy);
        // Axios.post()
    }
    // 将对应的App中的全局数据data进行更新
    // 并请求后端对应接口修改数据
    const replaceItemWithIndex = (index: number, item: Task) => {
        if (index == -1) return;
        const newData = [...data];
        newData[index] = item;
        setData(newData);
    }
    // 将对应的App中的全局数据data进行更新
    // 并请求后端对应接口添加数据
    const addTodoItem = (item: Task) => {
        const newData = [...data];
        newData.push(item);
        setData(newData);
    }

    return (
        <Router>
            {/* / -- TodoComponent */}
            <Route
                path="/"
                exact
                render={() =>
                    <Todo
                        TasksList={data}
                        makeItemFinished={makeItemFinished} />}>
            </Route>
            {/* /VisitFinished -- FinishedItemList */}
            <Route
                path="/VisitFinished"
                render={() =>
                    <FinishedItemList
                        TasksList={data} />}>
            </Route>
            {/* /addItem -- AddTodoItem */}
            <Route
                path="/addItem"
                render={() =>
                    <AddTodoItem
                        person={person}
                        handleAddItem={addTodoItem} />}>
            </Route>
            {/* /editItem--EditTodoItem */}
            <Route
                path="/editItem"
                render={() =>
                    <EditTodoItem
                        TasksList={data}
                        handleRefreshTasksList={replaceItemWithIndex} />}>
            </Route>

        </Router >

    )
}
export default App;
