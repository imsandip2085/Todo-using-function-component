import React, { useState, useEffect } from "react";
import "./App.css";
import DatePicker from "react-date-picker";
import {
  Button,
  TextField,
  Checkbox,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  CardContent,
  Card,
} from "@material-ui/core";
// import { KeyboardDatePicker } from "@material-ui/pickers";
// import { MuiPickersUtilsProvider, InlineDatePicker } from "material-ui-pickers";
import { makeStyles } from "@material-ui/core/styles";

function FormSubmit() {
  const [title, setTitle] = useState("");
  const [todoItem, setTodoItem] = useState([]);
  const [buttonStatus, setButtonStatus] = useState("");
  const [date, setDate] = useState(new Date());

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    title: {
      flexGrow: 1,
      // margin: theme.spacing(1),
    },
    cards: {
      minHeight: "50vh",
    },
  }));

  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title == "") {
      let todo = {
        id: Math.random(),
        todo: title,
        completed: false,
        dates: date.toLocaleDateString(),
      };
      setTodoItem([...todoItem, todo]);
    }
    setTitle("");
  };

  const handleDeleteListItem = (id) => {
    let todoItems = [...todoItem];
    todoItems.splice(id, 1);
    setTodoItem(todoItems);
  };
  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleChecked = (id, name, checkedValues) => {
    let todoItems = todoItem.map((val) => {
      if (val.id === id) {
        val.completed = !val.completed;
      }
      return val;
    });
    setTodoItem(todoItems);
  };

  const handleClickCompleted = () => {
    setButtonStatus("completed");
  };

  const handleClickActiveList = () => {
    setButtonStatus("activeList");
  };

  const handleClickAll = () => {
    setButtonStatus("all");
  };

  const handleAscSort = () => {
    setButtonStatus("asc");
  };
  const handleDscSort = () => {
    setButtonStatus("dsc");
  };

  return (
    <div className="todoForm">
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            Todo-App
          </Typography>
        </Toolbar>
      </AppBar>
      <div>
        <Card className={classes.cards}>
          <CardContent>
            <form
              onSubmit={handleSubmit}
              className={classes.root}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="standard-basic"
                label="Todo...."
                value={title}
                onChange={(event) => handleChange(event)}
              />
              <lable className="pickers">
              <DatePicker value={date} onChange={(date) => setDate(date)} />
              </lable>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                value="Submit"
              >
                {" "}
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      {buttonStatus == "all"
        ? todoItem.map((val, key) => {
            return (
              <div >
                <AppBar position="static">
                <Toolbar>
                <Checkbox
                  className={classes.title}
                  checked={val.checked}
                  type="checkbox"
                  id={val.id}
                  value={val.todo}
                  name="title"
                  onClick={() => handleChecked(val.id, val.todo, val.completed)}
                  inputProps={{ "aria-label": "checkbox with default color" }}
                />
                <Typography variant="h6" className={classes.title}  style={{ textDecoration: val.completed == true ? "line-through" : "", }}> {val.todo}</Typography>
                <Typography variant="h6" className={classes.title}> {val.dates}</Typography>
                <Button className={classes.title} onClick={() => handleDeleteListItem(key)}>X</Button>
                </Toolbar>
              </AppBar>
              </div>
            );
          })
        : buttonStatus == "activeList"
        ? todoItem.map((val, key) => {
            return val.completed === false ? (
              <div >
               <AppBar position="static">
                <Toolbar>
                <Checkbox
                  className={classes.title}
                  checked={val.checked}
                  type="checkbox"
                  id={val.id}
                  value={val.todo}
                  name="title"
                  onClick={() => handleChecked(val.id, val.todo, val.completed)}
                  inputProps={{ "aria-label": "checkbox with default color" }}
                />
                <Typography variant="h6" className={classes.title}  style={{ textDecoration: val.completed == true ? "line-through" : "", }}> {val.todo}</Typography>
                <Typography variant="h6" className={classes.title}> {val.dates}</Typography>
                <Button className={classes.title} onClick={() => handleDeleteListItem(key)}>X</Button>
                </Toolbar>
              </AppBar>
               </div>
            ) : null;
          })
        : buttonStatus == "completed"
        ? todoItem.map((val, key) => {
            return val.completed === true ? (
              <div style={{ backgroundColor: "#66a3ff", marginTop: "10px" }}>
                <AppBar position="static">
                <Toolbar>
                <Checkbox
                  className={classes.title}
                  checked={val.checked}
                  type="checkbox"
                  id={val.id}
                  value={val.todo}
                  name="title"
                  onClick={() => handleChecked(val.id, val.todo, val.completed)}
                  inputProps={{ "aria-label": "checkbox with default color" }}
                />
                <Typography variant="h6" className={classes.title}  style={{ textDecoration: val.completed == true ? "line-through" : "", }}> {val.todo}</Typography>
                <Typography variant="h6" className={classes.title}> {val.dates}</Typography>
                <Button className={classes.title} onClick={() => handleDeleteListItem(key)}>X</Button>
                </Toolbar>
              </AppBar>
              </div>
            ) : null;
          })
        : buttonStatus == "asc"
        ? todoItem
            .sort(
              (a, b) =>
                Date.parse(new Date(a.dates.split("/").reverse().join("-"))) -
                Date.parse(new Date(b.dates.split("/").reverse().join("-")))
            )
            .map((val, key) => {
              return (
                <div style={{ backgroundColor: "#66a3ff", marginTop: "10px" }}>
                  <AppBar position="static">
                <Toolbar>
                <Checkbox
                  className={classes.title}
                  checked={val.checked}
                  type="checkbox"
                  id={val.id}
                  value={val.todo}
                  name="title"
                  onClick={() => handleChecked(val.id, val.todo, val.completed)}
                  inputProps={{ "aria-label": "checkbox with default color" }}
                />
                <Typography variant="h6" className={classes.title}  style={{ textDecoration: val.completed == true ? "line-through" : "", }}> {val.todo}</Typography>
                <Typography variant="h6" className={classes.title}> {val.dates}</Typography>
                <Button className={classes.title} onClick={() => handleDeleteListItem(key)}>X</Button>
                </Toolbar>
              </AppBar>
                </div>
              );
            })
        : buttonStatus == "dsc"
        ? todoItem
            .sort(
              (a, b) =>
                Date.parse(new Date(b.dates.split("/").reverse().join("-"))) -
                Date.parse(new Date(a.dates.split("/").reverse().join("-")))
            )
            .map((val, key) => {
              return (
                <div style={{ backgroundColor: "#66a3ff", marginTop: "10px" }}>
                <AppBar position="static">
                <Toolbar>
                <Checkbox
                  className={classes.title}
                  checked={val.checked}
                  type="checkbox"
                  id={val.id}
                  value={val.todo}
                  name="title"
                  onClick={() => handleChecked(val.id, val.todo, val.completed)}
                  inputProps={{ "aria-label": "checkbox with default color" }}
                />
                <Typography variant="h6" className={classes.title}  style={{ textDecoration: val.completed == true ? "line-through" : "", }}> {val.todo}</Typography>
                <Typography variant="h6" className={classes.title}> {val.dates}</Typography>
                <Button className={classes.title} onClick={() => handleDeleteListItem(key)}>X</Button>
                </Toolbar>
              </AppBar>
                </div>
              );
            })
        : todoItem.map((val, key) => {
            return (
              <div style={{ backgroundColor: "#66a3ff", marginTop: "10px" }}>
              <AppBar position="static">
                <Toolbar>
                <Checkbox
                  className={classes.title}
                  checked={val.checked}
                  type="checkbox"
                  id={val.id}
                  value={val.todo}
                  name="title"
                  onClick={() => handleChecked(val.id, val.todo, val.completed)}
                  inputProps={{ "aria-label": "checkbox with default color" }}
                />
                <Typography variant="h6" className={classes.title}  style={{ textDecoration: val.completed == true ? "line-through" : "", }}> {val.todo}</Typography>
                <Typography variant="h6" className={classes.title}> {val.dates}</Typography>
                <Button  onClick={() => handleDeleteListItem(key)}  type="submit" size="small" variant="contained" color="secondary">Delete</Button>
                </Toolbar>
              </AppBar>
              </div>
            );
          })}
      <div className={classes.root}>
        <Button
          type="submit"
          size="small"
          variant="contained"
          color="primary"
          onClick={() => handleClickAll()}
        >
          All
        </Button>
        {""}
        <Button
          type="submit"
          size="small"
          variant="contained"
          color="primary"
          onClick={() => handleClickActiveList()}
        >
          ActiveList
        </Button>
        {""}
        <Button
          type="submit"
          size="small"
          variant="contained"
          color="primary"
          onClick={() => handleClickCompleted()}
        >
          Completed
        </Button>
        {""}
        <Button
          type="submit"
          size="small"
          variant="contained"
          color="primary"
          onClick={() => handleAscSort()}
        >
          sorting list in asc
        </Button>
        {""}
        <Button
          type="submit"
          size="small"
          variant="contained"
          color="primary"
          onClick={() => handleDscSort()}
        >
          sorting list in dsc
        </Button>
      </div>
    </div>
  );
}

export default FormSubmit;
