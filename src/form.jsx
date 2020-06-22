import React, { useState } from 'react';
import { Card,Form,Row,Col, Button } from 'react-bootstrap';
import './App.css';

function FormSubmit () {
   
    const [title, setTitle] = useState("")
    const [todoItem , setTodoItem] = useState([]);
    const [filterTodoItemList , setFilterTodoItemList] = useState([]);
    const [storageItem , setStorageItem] = useState(JSON.parse(localStorage.getItem('user')) != 0 ?
    [JSON.parse(localStorage.getItem('user'))] : [0]);
    const [storageItem2 , setStorageItem2] = useState(JSON.parse(localStorage.getItem('user')) != 0 ?
    [JSON.parse(localStorage.getItem('user'))] : [0]);
 
 console.log(storageItem,"sssssssssssssssssssssssssssssssssssssssss");
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
       setStorageItem([...storageItem, todo])
       setStorageItem([...storageItem2, todo])
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

   let storageItems = [...storageItem];
   storageItems.splice(id, 1);
   setFilterTodoItemList(storageItems)

   let storageItems2 = [...storageItem2];
   storageItems2.splice(id, 1);
   setFilterTodoItemList(storageItems2)

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
    localStorage.setItem('user', JSON.stringify(todoItems));
    setStorageItem(todoItems)
    setTodoItem(todoItems)

    let todoItems2 = storageItem.map(val => {
      if (val.id === id) {
        val.completed = !val.completed ;
      }
      return val
    });

    setFilterTodoItemList(todoItems2)
    setStorageItem2(todoItems2)
} 

const handleClickCompleted = () =>{
var completedListItems = todoItem.filter(function(val){
  return val.completed == true;
})
setStorageItem(completedListItems)
setFilterTodoItemList(completedListItems);

var completedListItems2 = storageItem.filter(function(val){
  return val.completed == true;
})
setStorageItem(completedListItems2)
setStorageItem2(completedListItems2) 

}

const handleClickActiveList = () =>{
  
  var activeListItems = todoItem.filter(function(val){
    return val.completed == false;
  })
  setFilterTodoItemList(activeListItems);
  setStorageItem(activeListItems) 

  var activeListItems2 = storageItem.filter(function(val){
    return val.completed == false;
  })
  setStorageItem(activeListItems2)
  setStorageItem2(activeListItems2) 
  }
  
const handleClickAll = () =>{ 
  setStorageItem2(storageItem) 
  setFilterTodoItemList(todoItem);
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
                 (JSON.parse(localStorage.getItem('user')) != 0 ?
                 storageItem.map((val, key) =>{
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
                  })  :
               filterTodoItemList.map((val, key) =>{
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
                 )
               } 
               <Button type="submit" variant="outline-danger" onClick={() =>handleClickAll()}>All</Button>{''}
               <Button type="submit" variant="outline-danger" onClick={() =>handleClickActiveList()}>ActiveList</Button>{''}
               <Button type="submit" variant="outline-danger" onClick={() => handleClickCompleted()}>Completed</Button>
        </div>
    )
}

export default FormSubmit;