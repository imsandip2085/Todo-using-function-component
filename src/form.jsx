import React, { useState } from 'react';
import { Card,Form,Row,Col, Button } from 'react-bootstrap';
import './App.css';

function FormSubmit () { 
  const [title, setTitle] = useState("")
  const [todoItem , setTodoItem] = useState([]);
  const [storeTodoItem , setStoreTodoItem] = useState(JSON.parse(localStorage.getItem('user')) != 0 ? JSON.parse(localStorage.getItem('user')) : [0]);
  const [buttonStatus, setButtonStatus] = useState('')
 

 const handleSubmit = e => {
     e.preventDefault();
     if(!title == ""){
       let todo= {
         id : Math.random(),
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
      if (val.id === id) {
        val.completed = !val.completed ;
      }
      return val
    });
    localStorage.setItem('user', JSON.stringify(todoItems));
    setTodoItem(todoItems)
    // setStoreTodoItem(JSON.parse(localStorage.getItem('user')))
} 


const handleSubmitStore = e => {
  e.preventDefault();
  if(!title == ""){
    let todo= {
      id : Math.random(),
      todo:title,
      completed:false
    }
     setStoreTodoItem([...storeTodoItem, todo])
  }
  setTitle("")
};

const handleDeleteListItemStore = (id) =>{
let storeTodoItems = [...storeTodoItem];
storeTodoItems.splice(id, 1);
setStoreTodoItem(storeTodoItems);

}
const handleChangeStore = event => {
 setTitle(event.target.value)
};

const handleCheckedStore = (id, name, checkedValues) =>{
  let storeTodoItems = storeTodoItem.map(val => {
    if (val.id === id) {
      val.completed = !val.completed ;
    }
    return val
  });
  setStoreTodoItem(storeTodoItems)
  // setStoreTodoItem(JSON.parse(localStorage.getItem('user')))
} 






const handleClickCompleted = () =>{
  setButtonStatus("completed")
}

const handleClickActiveList = () =>{
  setButtonStatus("activeList")

}
  
const handleClickAll = () =>{ 
  setButtonStatus("all")

}

return(
        <div className="todoForm">
             <h1>Todo App</h1>
             {
                (localStorage.getItem('user') === null) ? 
                (
                  <form onSubmit={handleSubmit}>
                  <input type="text" 
                     placeholder="Todo..." 
                     value={title} 
                     onChange={(event)=>handleChange(event)}>
                  </input>
               </form>  
                ):
                (
                  <form onSubmit={handleSubmitStore}>
                  <input type="text" 
                     placeholder="Todo..." 
                     value={title} 
                     onChange={(event)=>handleChangeStore(event)}>
                  </input>
               </form>
                )
             }
          
               {
                 (localStorage.getItem('user') === null) ?
                ( 
                  buttonStatus =="all"  ? 
                todoItem.map((val, key) =>{
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
                    (buttonStatus =="activeList" ?
                      todoItem.map((val, key) =>{ 
                        return (
                         val.completed === false ?
                         (
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
                         ): null
                        )
                      })
                      :
                      (buttonStatus =="completed"  ? 
                      todoItem.map((val, key) =>{
                       return (
                        val.completed === true ?
                        (
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
                    ) : null
                  )
                  }) 
                     :
                        todoItem.map((val, key) =>{
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
                  )
                  )
                   : (
                    // <div>sdf</div>
                    (buttonStatus =="all"  ? 
                    storeTodoItem.map((val, key) =>{
                       return (
                        <div>
                          <input
                           checked={val.checked}
                           type="checkbox"
                           id={val.id}
                           value={val.todo}
                           name="title"
                           onClick={() => handleCheckedStore(val.id, val.todo, val.completed)}
                          />   
                          <p style={{ textDecoration: val.completed == true ? "line-through" : "" }}>{val.todo}</p>
                           <Button onClick={() => handleDeleteListItemStore(key)}>X</Button> 
                        </div>
                      )
                      }) 
                       : 
                        (buttonStatus =="activeList" ?
                        storeTodoItem.map((val, key) =>{ 
                            return (
                             val.completed === false ?
                             (
                             <div>
                               <input
                                checked={val.checked}
                                type="checkbox"
                                id={val.id}
                                value={val.todo}
                                name="title"
                                onClick={() => handleCheckedStore(val.id, val.todo, val.completed)}
                               />   
                               <p style={{ textDecoration: val.completed == true ? "line-through" : "" }}>{val.todo}</p>
                               <Button onClick={() => handleDeleteListItemStore(key)}>X</Button>
                             </div>
                             ): null
                            )
                          })
                          :
                          (buttonStatus =="completed"  ? 
                          storeTodoItem.map((val, key) =>{
                           return (
                            val.completed === true ?
                            (
                           <div>
                             <input
                               checked={val.checked}
                               type="checkbox"
                               id={val.id}
                                value={val.todo}
                               name="title"
                              onClick={() => handleCheckedStore(val.id, val.todo, val.completed)}
                              />   
                             <p style={{ textDecoration: val.completed == true ? "line-through" : "" }}>{val.todo}</p>
                             <Button onClick={() => handleDeleteListItemStore(key)}>X</Button> 
                        </div>
                        ) : null
                      )
                      }) 
                         :
                         storeTodoItem.map((val, key) =>{
                              return (
                               <div>
                                 <input
                                  checked={val.checked}
                                  type="checkbox"
                                  id={val.id}
                                  value={val.todo}
                                  name="title"
                                  onClick={() => handleCheckedStore(val.id)}
                                 />   
                                 <p style={{ textDecoration: val.completed == true ? "line-through" : "" }}>{val.todo}</p>
                                 <Button onClick={() => handleDeleteListItemStore(key)}>X</Button>
                               </div>
                             )
                            })
                           )
                      )
                      )
                  )
                  
               } 
               <Button type="submit" variant="outline-danger" onClick={() =>handleClickAll()}>All</Button>{''}
               <Button type="submit" variant="outline-danger" onClick={() =>handleClickActiveList()}>ActiveList</Button>{''}
               <Button type="submit" variant="outline-danger" onClick={() => handleClickCompleted()}>Completed</Button>
        </div>
    )
}

export default FormSubmit;

