import React, { useState } from 'react';
import { Card,Form,Row,Col, Button } from 'react-bootstrap';
import './App.css';

function FormSubmit () {
   
    const [title, setTitle] = useState("")
    const [todoItem , setTodoItem] = useState([]);
    const [filterTodoItemList , setFilterTodoItemList] = useState([]);

    localStorage.setItem('user', JSON.stringify(filterTodoItemList));
 const handleSubmit = e => {
     e.preventDefault();
     if(!title == ""){
       let todo= {
         id : Math.random(),
         todo:title,
         completed:false
       }
       setTodoItem([...todoItem, todo])
       setFilterTodoItemList([...filterTodoItemList, todo])
     }
     setTitle("")
  };
   
  const handleDeleteListItem = (id) =>{
   let todoItems = [...todoItem];
     todoItems.splice(id, 1);
   setTodoItem(todoItems);
   let filterTodoItemLists = [...filterTodoItemList];
   filterTodoItemList.splice(id, 1);
   setFilterTodoItemList(filterTodoItemList)
  }

  const handleChange = event => {
    setTitle(event.target.value)
  };

const handleChecked = (id, name, checkedValues) =>{
    let todoItems = filterTodoItemList.map(val => {
      if (val.id === id) {
        val.completed = !val.completed ;
      }
      return val
    });
    localStorage.setItem('todoItemStorage', JSON.stringify(todoItems));

    setTodoItem(todoItems)
    setFilterTodoItemList(todoItems)
} 

const handleClickCompleted = () =>{
var completedListItems = JSON.parse(localStorage.getItem('todoItemStorage')).filter(function(val){
  return val.completed == true;
})

setFilterTodoItemList(completedListItems);
}

const handleClickActiveList = () =>{
  
  var activeListItems = JSON.parse(localStorage.getItem('todoItemStorage')).filter(function(val){
    return val.completed == false;
  })
  setFilterTodoItemList(activeListItems);
  }
  
const handleClickAll = () =>{
   
  setFilterTodoItemList(JSON.parse(localStorage.getItem('todoItemStorage')));
}

  // console.log( JSON.parse(localStorage.getItem('user')) == 0);
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
                (JSON.parse(localStorage.getItem('todoItemStorage')) == 0 ? 
                todoItem.map((val, key) =>{
                  console.log("AAAAAAAAAAAAA")
                   return (
                    <div>
                      <input
                       checked={val.checked}
                       type="checkbox"
                       id={val.id}
                       value={val.todo}
                       name="title"
                       onClick={() => handleChecked(val.id, val.todo, val.completed)}
                      />   
                      <p style={{ textDecoration: val.completed == true ? "line-through" : "" }}>{val.todo}</p>
                       <Button onClick={() => handleDeleteListItem(key)}>X</Button> 
                    </div>
                  )
                  })  
                  : 
                   (JSON.parse(localStorage.getItem('user')) !== 0 ?
                  JSON.parse(localStorage.getItem('user')).map((val, key) =>{
                    console.log("eeeeeeee")
                   return (
                    <div>
                      <input
                       checked={val.checked}
                       type="checkbox"
                       id={val.id}
                       value={val.todo}
                       name="title"
                       onClick={() => handleChecked(val.id, val.todo, val.completed)}
                      />   
                      <p style={{ textDecoration: val.completed == true ? "line-through" : "" }}>{val.todo}</p>
                      <Button onClick={() => handleDeleteListItem(key)}>X</Button>
                    </div>
                  )
                  }) 
                  : 
                  (JSON.parse(localStorage.getItem('user')) === 0 ?
                  console.log("SSSSSSSSSS"):
                  JSON.parse(localStorage.getItem('todoItemStorage')).map((val, key) =>{
                    console.log("BBBBBBBBBBBBB")
                   return (
                    <div>
                      <input
                       checked={val.checked}
                       type="checkbox"
                       id={val.id}
                       value={val.todo}
                       name="title"
                       onClick={() => handleChecked(val.id, val.todo, val.completed)}
                      />   
                      <p style={{ textDecoration: val.completed == true ? "line-through" : "" }}>{val.todo}</p>
                      <Button onClick={() => handleDeleteListItem(key)}>X</Button>
                    </div>
                  )
                  }) 
                )))
               } 
               <Button type="submit" variant="outline-danger" onClick={() =>handleClickAll()}>All</Button>{''}
               <Button type="submit" variant="outline-danger" onClick={() =>handleClickActiveList()}>ActiveList</Button>{''}
               <Button type="submit" variant="outline-danger" onClick={() => handleClickCompleted()}>Completed</Button>
        </div>
    )
}

export default FormSubmit;