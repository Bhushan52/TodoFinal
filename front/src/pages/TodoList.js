import React, {Component} from 'react';
import './Login.css';
import Logo from '../components/Logo';
import CheckboxList from '../components/todolist/CheckboxList';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: null };
    this.loadTodos = this.loadTodos.bind(this);
    this.createTodo = this.createTodo.bind(this);
  }

  loadTodos(){
    let todos = {};
    todos[1] = this.createTodo("Doing something", false, new Date());
    todos[2] = this.createTodo("Doing something other", false, new Date());
    todos[3] = this.createTodo("Doing something else", false, new Date());
    todos[4] = this.createTodo("Doing something", true, new Date());
    todos[5] = this.createTodo("Doing something else", true, new Date());
    this.setState({
      todos
    });
  }

  componentWillMount() {
    this.loadTodos();
  }

  createTodo(text, completed, lastUpdate){
    return {text, completed, lastUpdate};
  }

  handleItemDelete = item => {

  }

  renderTodoList = items => {
    console.log(items);
    return (
    <CheckboxList items={items} 
      toggleField="completed" 
      textField="text"
      onItemDelete={this.handleItemDelete}/>
      )
  }

  render() {
    return (
      <div>
        <div className="TodoList_header">
          <Logo className="TodoList_Logo"/>
        </div>

        <div className="TodoList_body">
          <Typography variant="display1" gutterBottom>
            Todo
          </Typography>
          <Divider />
          {this.renderTodoList(this.state.todos)}
        </div>  
      </div>
    );
  }
}

export default TodoList;
