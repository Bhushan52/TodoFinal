import React, {Component} from 'react';
import Logo from '../components/Logo';
import CheckboxList from '../components/todolist/CheckboxList';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import {getTodos, addTodo, deleteTodo} from '../api/todoApi';
import './TodoList.css';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: {}, error: null };
    this.loadTodos = this.loadTodos.bind(this);
    this.createTodo = this.createTodo.bind(this);
    this.handleAddTodo = this.handleAddTodo.bind(this);
    // this.addTodoToState = this.addTodoToState.bind(this);
    
  }

  loadTodos(){
    getTodos().then(response => {
        let formattedTodos = this.convertToObjects(response);
        this.setState({todos: formattedTodos});
      })
    .catch(error => {
        this.setState({error: "Unable to retrieve todo's"});
      }
    );
  }

  convertToObjects(response){
    let todos = {};
    response.map(item => {
      todos[item.id] = this.createTodo(item.text, item.completed, item.lastUpdate);
    } )
  }

  componentWillMount() {
    this.loadTodos();
  }

  createTodo(text, completed, lastUpdate){
    return {text, completed, lastUpdate};
  }

  handleItemDelete = itemId => event => {
    
    deleteTodo(itemId).then(response => {
      let updated = { ...this.state.todos }
      delete updated[itemId];
      this.setState(prevState => ({
        todos: updated
      }))

    })
  }

  renderTodoList = items => {
    if(items !== null && items !== undefined)
      return (
      <CheckboxList items={items} 
        toggleField="completed" 
        textField="text"
        onItemDelete={this.handleItemDelete}/>)
    return <p>You don't have any Todo items. Get productive, add some.</p>;
  }

  handleAddTodo(){
    addTodo(this.createTodo()).then(response => {
      this.addTodoToState(response);
    })
  }

  addTodoToState(newTodo){    
    let updated = { ...this.state.todos }
    updated[newTodo.id] = this.createTodo(newTodo.text, newTodo.completed, newTodo.lastUpdate)
    this.setState(prevState => ({
      todos: updated
    }))
  }
  createTodo = () => ({id: null, text: '', completed:false});

  render() {
    return (
      <div>
        <div className="TodoList_header">
          <Logo className="TodoList_Logo"/>
        </div>

        <div className="TodoList_body">
          <Button variant="fab" color="primary" aria-label="add" className="TodoList_button_add" onClick={this.handleAddTodo}>
            <Icon>add</Icon>
          </Button>

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
