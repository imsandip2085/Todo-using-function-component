import React, { useState , useEffect} from 'react';
import { Card,Form,Row,Col, Button } from 'react-bootstrap';
import './App.css';
import DatePicker from 'react-date-picker';



function FormSubmit () { 
  const [title, setTitle] = useState("")
  // const [todoItem2 , setTodoItem2] = useState([]);
  const [todoItem , setTodoItem] = useState([]);
  const [buttonStatus, setButtonStatus] = useState('')
  const [date, setDate] = useState(new Date());
 

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
    setTodoItem(todoItems)
   
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
            <h1>Date Picker</h1>
              <DatePicker
                 value={date}
                 onChange={date => setDate(date)}
              />
             <h1>Todo App</h1>
              <h3>{date.toLocaleDateString()}</h3>
                <form onSubmit={handleSubmit}>
                  <input type="text" 
                     placeholder="Todo..." 
                     value={title} 
                     onChange={(event)=>handleChange(event)}>
                  </input>
                </form>  
             {
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
                 
               } 
               <Button type="submit" variant="outline-danger" onClick={() =>handleClickAll()}>All</Button>{''}
               <Button type="submit" variant="outline-danger" onClick={() =>handleClickActiveList()}>ActiveList</Button>{''}
               <Button type="submit" variant="outline-danger" onClick={() => handleClickCompleted()}>Completed</Button>
        </div>
    )
}

export default FormSubmit;

