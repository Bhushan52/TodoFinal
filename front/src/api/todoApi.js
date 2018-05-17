import {doRequest, doPostRequest, doDeleteRequest} from './base'

const TODO_PATH = "/api/todos";

export const getTodos = () => {
     return doRequest(TODO_PATH)
    .then(response => response.json());
}

export const addTodo = (todo) => {
	return doPostRequest(TODO_PATH, todo)
    .then(response => response.json());
}

export const deleteTodo = (todoId) => {	
    return doDeleteRequest(TODO_PATH + "/" + todoId);
}