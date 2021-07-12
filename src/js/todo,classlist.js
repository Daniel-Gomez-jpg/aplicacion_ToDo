export class TodoList{

    constructor(){
      //  this.todos = []
      this.cargarLocalStorage()

    }

    nuevoTodo(todo){
        this.todos.push(todo)
        this.guardarLocalStorage()
    }

    eliminarTodo(id){
        let index = this.todos.indexOf(id)
        this.todos.splice(index, 1)
        this.guardarLocalStorage()
    }

    marcarCompletado(id){
        for(let todo of this.todos){
            if(todo.id == id){
                todo.completado = !todo.completado
                break
            }
        }
        this.guardarLocalStorage()
    }

    eliminarCompletados(){
        for(let todo of this.todos){
            if(todo.completado){
                let index = this.todos.indexOf(todo)
                this.todos.splice(index,1)

            }
        }
        this.guardarLocalStorage()
    }

    guardarLocalStorage(){
        localStorage.setItem('todo', JSON.stringify(this.todos))
    }

    cargarLocalStorage(){
        if(localStorage.getItem('todo')){

            this.todos = JSON.parse(localStorage.getItem('todo'))

            console.log(this.todos)
            
        }else{
            this.todos = []
        }
    }
}