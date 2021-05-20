import React, { useEffect, useState } from 'react'
import { RealTask, Task, PersonInfo } from './components/Todo/types'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { TodoComponent as Todo, FinishedTodo } from './components/Todo'

const DayLength: number = 60 * 24 * 60 * 1000;
function produceData(): Task[] {

    let TestData: Task[] = [];
    const person1: PersonInfo = {
        Name: "顾承（我）",
        Id: "00001",
    }
    TestData.push(new RealTask({
        Title: "Task1",
        Person: person1,
        ExpireTime: new Date(Date.now() + DayLength),
    }))
    TestData.push(new RealTask({
        Title: "Task2",
        Person: person1,
        ExpireTime: new Date(Date.now() + 2 * DayLength),
        Memo: "Must do it",
    }))
    TestData.push(new RealTask({
        Title: "Task3",
        Person: person1,
        ExpireTime: new Date(Date.now() + 10 * DayLength),
        Memo: "Must do it",
    }))
    return TestData;
}
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
        </Router >

    )
}
export default App;
