import './styles/app.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TodoContext from './context/TodoContext';


 class App extends Component {
    render() {
        return (
            <TodoContext></TodoContext>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));