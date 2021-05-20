import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { TodoComponent as Todo, UnderTodo } from './components/Todo'

const App: React.FC<{}> = () => {
    return (
        <Router>
            <Route
                path="/"
                exact
                component={Todo}>
            </Route>
            <Route
                path="/VisitFinished"
                component={UnderTodo}>
            </Route>
        </Router>

    )
}
export default App;
