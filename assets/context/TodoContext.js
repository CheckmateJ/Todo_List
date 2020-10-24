import React, { Component } from 'react'


class TodoContext extends Component {
  constructor(props){
    super(props);
    this.state = {tasks: [], text: '', name: "Todo List:"};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(id){
    this.setState(prevState => ({
      tasks: prevState.tasks.filter(el => el != id)
    }));
  }

  handleSubmit(e){
    e.preventDefault();
    if(this.state.text.length === 0){
      return;
    }
    const newTask = { 
      text: this.state.text,
      id: Date.now()
    };
    this.setState(state => ({
      tasks: state.tasks.concat(newTask),
      text: ''
    }));
    
  }

  handleChange(e){
    this.setState({text: e.target.value})
  }
  
  componentDidUpdate(){
    localStorage.setItem('tasks', JSON.stringify(this.state.tasks))
  }

  componentWillMount(){
    let tasksList = localStorage.getItem('tasks')
    if(tasksList){
      this.setState({
        tasks: JSON.parse(localStorage.getItem('tasks'))
      })
    }
  }

  render(){
    return (
      <div className="rectangle">
        <h3  className="header">{this.state.name}</h3>
        <TodoList tasks={this.state.tasks} handleDelete={this.handleDelete}/>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={this.state.text} placeholder="What do you have to do?"/>
          <button type="submit"> + </button>
        </form>
      </div>
    )
  }
}

class TodoList extends Component{

  handleDelete(id){
    this.props.handleDelete(id);
  }

  render(){
    return (
      <div className="Todo-list">
      <ol>
        {this.props.tasks.map(task => (
          <li key={task.id}>{task.text}
          <button onClick={this.handleDelete.bind(this,task)}>Delete</button>
          </li>
        ))}
      </ol>
      </div>
    )
  }
}

export default TodoContext;