import './styles.css'
import { Todo } from './js/todo.class.js'
import { TodoList } from './js/todo,classlist'
import { crearTodoEnHtml } from './js/componentes'


export const todoList = new TodoList()

todoList.todos.forEach(todo => crearTodoEnHtml(todo))



//crearTodoEnHtml(tarea)

//console.log( todoList )