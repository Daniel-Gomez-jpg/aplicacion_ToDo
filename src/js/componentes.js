import { todoList } from "../index"
import { Todo } from "./todo.class"


let contadorTodo = 0

//referencias al html
const divTodoList = document.querySelector('.todo-list')
const txtInput = document.querySelector('.new-todo')
const spanCountTodo = document.querySelector('#strong-count')
const borrarCompletados = document.querySelector('.clear-completed')
const listaFiltros = document.querySelector('.filters')

export const crearTodoEnHtml = (todo) =>{

    const htmlTodo = `   <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">
			<div class="view">
					<input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
						<label>${ todo.tarea }</label>
							<button class="destroy"></button>
						</div>
						<input class="edit" value="Create a TodoMVC template">
					</li>`

    const div = document.createElement('div')

    div.innerHTML = htmlTodo

    divTodoList.append(div)

    return div
}

const contadorPendientes = ()=>{
    for(let pendiente of divTodoList.children){
        const pendienteVerdadero = !(pendiente.firstElementChild.classList.contains('completed'))
        
        if(pendienteVerdadero){
            contadorTodo = contadorTodo + 1
        }else{
            contadorTodo = contadorTodo -1
        }
        return spanCountTodo.innerHTML = contadorTodo
        
    }
}



//eventos click

txtInput.addEventListener('keyup', (event) => {

    
    if(  (event.code === "Enter") && (txtInput.value.length > 0) && ( isNaN(txtInput.value) )  ){

        console.log(txtInput.value)

        const nuevoTodo = new Todo(txtInput.value)
        
        todoList.nuevoTodo(nuevoTodo)

        crearTodoEnHtml(nuevoTodo)

        txtInput.value = ""

        
        contadorPendientes()        
    }

})

divTodoList.addEventListener('click', (event) =>{

    const nombreElemento = event.target.localName //si es un input. label o button
    const todoElemento = event.target.parentElement.parentElement // es necesario obtener el elemento padre del nombreElemento, pues necesito el data-id incluido en la etiqueta <li>
    const todoId = todoElemento.getAttribute('data-id')

    if(nombreElemento === 'input'){
        todoList.marcarCompletado(todoId)
        todoElemento.classList.toggle('completed')
        contadorPendientes()
    }

    if(nombreElemento === 'button'){
        todoList.eliminarTodo(todoId) 
        todoElemento.innerHTML = ''
        if( !(todoElemento.classList.contains('completed') )){
            
            contadorPendientes()
        }
    }

    console.log(todoList)
    
})

borrarCompletados.addEventListener('click', ()=>{
    todoList.eliminarCompletados()
    
    const completados = document.querySelectorAll(".completed");
    
    for (let completado of completados) {
    completado.classList.add('hidden');
  }
  console.log(todoList)
})

listaFiltros.addEventListener('click', (event)=>{

    const boton = event.target.text
    
    if(!boton){ return }
    
    //for de la clase "selected"
    for (let opcion of listaFiltros.children){
        opcion.firstElementChild.classList.remove('selected')
    }
    
    event.target.classList.add('selected')
    
    //for de la lista de filtros 

    for(let elemento of divTodoList.children){
        elemento.classList.remove('hidden')

        const completado = elemento.firstElementChild

        switch(boton){

            case 'Completados':

            if(!(completado.classList.contains('completed'))){
                
                elemento.classList.add('hidden')
            }
            break

            case 'Pendientes':

            if(completado.classList.contains('completed')){
                elemento.classList.add('hidden')
            }
                break
        }
    } 

})