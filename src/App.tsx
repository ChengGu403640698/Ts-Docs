import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { Task } from './components/Todo/types'
import { person, produceData } from './components/Todo/global'
import { TodoComponent as Todo, FinishedTodo, EditTodoItem, AddTodoItem } from './components/Todo'

const App: React.FC<{}> = () => {

    let [data, setData]: [Task[], any] = useState([]);


    useEffect(() => {
        setData(produceData());
    }, []);

    const makeItemFinished = (target: Task) => {
        const datacopy = [...data]
        data.forEach((item, index) => {
            if (item === target) {
                datacopy[index].ifFinished = true;
            }
        })
        setData(datacopy);
    }

    return (
        <Router>
            <Route
                path="/"
                exact
                component={() => <Todo TasksList={data} freshTasksList={(target) => { makeItemFinished(target) }} />}>
            </Route>
            <Route
                path="/VisitFinished"
                render={() => <FinishedTodo TasksList={data} />}>
            </Route>
            <Route
                path="/editItem"
                render={() => <EditTodoItem TasksList={data}
                    handleRefreshTasksList={
                        (index: number, item: Task) => {
                            if (index == -1) return;
                            const newData = [...data];
                            newData[index] = item;
                            setData(newData);
                        }} />}>
            </Route>
            <Route
                path="/addItem"
                render={() => <AddTodoItem person={person} handleAddItem={(item: Task) => {
                    const newData = [...data];
                    newData.push(item);
                    setData(newData);
                }} />}>
            </Route>
        </Router >

    )
}
export default App;
