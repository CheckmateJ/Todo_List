import React, { Component } from 'react'


class TodoContext extends Component {
  constructor(props){
    super(props);
    this.state = {tasks: [], text: '', name: "Todo List:", id:''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
  }


  // delete task
  handleDelete(id){
    this.setState(prevState => ({
      tasks: prevState.tasks.filter(el => el != id)
    }));
  }

  // add new task to list 
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

  // fetch value from input 
  handleChange(e){
    this.setState({text: e.target.value})
  }
  
  // save task to local storage
  componentDidUpdate(){
    localStorage.setItem('tasks', JSON.stringify(this.state.tasks))
  }

  // get task from local storage 
  componentWillMount(){
    let tasksList = localStorage.getItem('tasks')
    if(tasksList){
      this.setState({
        tasks: JSON.parse(localStorage.getItem('tasks'))
      })
    }
  }

  // edit existing task
  setUpdate(text, id){
    const tasks = this.state.tasks;
    tasks.map(task =>{
      if(task.id ===id){
        task.text = text;
      }
    })
    this.setState({
      tasks: tasks
    })

  }

  render(){
    return (
      <div className="container">
        <h3  className="header">{this.state.name}</h3>
        <TodoList tasks={this.state.tasks} handleDelete={this.handleDelete} setUpdate={this.setUpdate}/>
        <form onSubmit={this.handleSubmit}>
          <input className="Todo-add" onChange={this.handleChange} value={this.state.text} placeholder="What do you have to do?"/>
          <button className="Todo-add-btn" type="submit"> + </button>
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
          <li className="tasks" key={task.id}>
          <input type="text" id={task.id} value={task.text} onChange={(e) => { this.props.setUpdate(e.target.value, task.id)}}/> 
          <button class="delete-item" onClick={this.handleDelete.bind(this,task)}>Delete</button>
          </li>
        ))}
      </ol>
      </div>
    )
  }
}

export default TodoContext;