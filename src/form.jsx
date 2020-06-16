import React, { useState } from 'react';
import { Card,Form,Row,Col, Button } from 'react-bootstrap';
import './App.css';

function FormSubmit () {
   
    const [title, setTitle] = useState("")
    const [todoItem , setTodoItem] = useState([]);

 const handleSubmit = e => {
     e.preventDefault();
     if(!title == ""){
       let todo= {
         todo:title,
         completed:false
       }
       setTodoItem([...todoItem, todo])
     }
     setTitle("")


  };
   
  const handleDeleteListItem = (id) =>{
   let todoItems = [...todoItem];
     todoItems.splice(id, 1);
   setTodoItem(todoItems);
  }

  const handleChange = event => {
    setTitle(event.target.value)
  };

const handleChecked = (id, name, checkedValues) =>{

    let todoItems = todoItem.map(val => {
      if (val.todo === name) {
        val.completed = !val.completed ;
      }
      return val
    });
    setTodoItem(todoItems)
} 

    return(
        <div className="todoForm">
             <h1>Todo App</h1>
             <form onSubmit={handleSubmit}>
                <input type="text" 
                   placeholder="Todo..." 
                   value={title} 
                   onChange={(event)=>handleChange(event)}>
                </input>
             </form>
              
               {
                  todoItem.map((val, key) =>{
                   return (
                     <div>
                         <input
                            checked={val.checked}
                            type="checkbox"
                            id={key}
                            value={val.todo}
                            name="title"
                            onClick={() => handleChecked(key, val.todo, val.completed)}
                          />   
                             <p style={{ textDecoration: val.completed == true ? "line-through" : "" }}>{val.todo}</p>
                             <Button onClick={() => handleDeleteListItem(key)}>X</Button>
                             </div>
                  )
                  }) 
               }
              
               
        </div>
    )
}

export default FormSubmit;