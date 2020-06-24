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
import { KeyboardDatePicker } from "@material-ui/pickers";
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
    // cards: {
    //   minWidth: "25ch",
    // },
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
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date picker dialog"
                format="MM/dd/yyyy"
                value={date}
                onChange={(date) => setDate(date)}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              <DatePicker value={date} onChange={(date) => setDate(date)} />
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
              <div style={{ backgroundColor: "#66a3ff", marginTop: "10px" }}>
                {/* <input
                       checked={val.checked}
                       type="checkbox"
                       id={val.id}
                       value={val.todo}
                       name="title"
                       onClick={() => handleChecked(val.id, val.todo, val.completed)}
                      />    */}
                <Checkbox
                  checked={val.checked}
                  type="checkbox"
                  id={val.id}
                  value={val.todo}
                  name="title"
                  onClick={() => handleChecked(val.id, val.todo, val.completed)}
                  inputProps={{ "aria-label": "checkbox with default color" }}
                />
                <p
                  style={{
                    textDecoration: val.completed == true ? "line-through" : "",
                  }}
                >
                  {val.todo}
                </p>
                <p className="pl-3">{val.dates}</p>
                <Button onClick={() => handleDeleteListItem(key)}>X</Button>
              </div>
            );
          })
        : buttonStatus == "activeList"
        ? todoItem.map((val, key) => {
            return val.completed === false ? (
              <div style={{ backgroundColor: "#66a3ff", marginTop: "10px" }}>
                {/* <input
                            checked={val.checked}
                            type="checkbox"
                            id={val.id}
                            value={val.todo}
                            name="title"
                            onClick={() => handleChecked(val.id, val.todo, val.completed)}
                           />    */}
                <Checkbox
                  checked={val.checked}
                  type="checkbox"
                  id={val.id}
                  value={val.todo}
                  name="title"
                  onClick={() => handleChecked(val.id, val.todo, val.completed)}
                  inputProps={{ "aria-label": "checkbox with default color" }}
                />
                <p
                  style={{
                    textDecoration: val.completed == true ? "line-through" : "",
                  }}
                >
                  {val.todo}
                </p>
                <p className="pl-3">{val.dates}</p>
                <Button onClick={() => handleDeleteListItem(key)}>X</Button>
              </div>
            ) : null;
          })
        : buttonStatus == "completed"
        ? todoItem.map((val, key) => {
            return val.completed === true ? (
              <div style={{ backgroundColor: "#66a3ff", marginTop: "10px" }}>
                {/* <input
                           checked={val.checked}
                           type="checkbox"
                           id={val.id}
                            value={val.todo}
                           name="title"
                          onClick={() => handleChecked(val.id, val.todo, val.completed)}
                          />    */}
                <Checkbox
                  checked={val.checked}
                  type="checkbox"
                  id={val.id}
                  value={val.todo}
                  name="title"
                  onClick={() => handleChecked(val.id, val.todo, val.completed)}
                  inputProps={{ "aria-label": "checkbox with default color" }}
                />
                <p
                  style={{
                    textDecoration: val.completed == true ? "line-through" : "",
                  }}
                >
                  {val.todo}
                </p>
                <p className="pl-3">{val.dates}</p>
                <Button onClick={() => handleDeleteListItem(key)}>X</Button>
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
                  {/* <input
                         checked={val.checked}
                         type="checkbox"
                         id={val.id}
                          value={val.todo}
                         name="title"
                        onClick={() => handleChecked(val.id, val.todo, val.completed)}
                        />    */}
                  <Checkbox
                    checked={val.checked}
                    type="checkbox"
                    id={val.id}
                    value={val.todo}
                    name="title"
                    onClick={() =>
                      handleChecked(val.id, val.todo, val.completed)
                    }
                    inputProps={{ "aria-label": "checkbox with default color" }}
                  />
                  <p
                    style={{
                      textDecoration:
                        val.completed == true ? "line-through" : "",
                    }}
                  >
                    {val.todo}
                  </p>
                  <p className="pl-3">{val.dates}</p>
                  <Button onClick={() => handleDeleteListItem(key)}>X</Button>
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
                  {/* <input
                         checked={val.checked}
                         type="checkbox"
                         id={val.id}
                          value={val.todo}
                         name="title"
                        onClick={() => handleChecked(val.id, val.todo, val.completed)}
                        />    */}
                  <Checkbox
                    checked={val.checked}
                    type="checkbox"
                    id={val.id}
                    value={val.todo}
                    name="title"
                    onClick={() =>
                      handleChecked(val.id, val.todo, val.completed)
                    }
                    inputProps={{ "aria-label": "checkbox with default color" }}
                  />
                  <p
                    style={{
                      textDecoration:
                        val.completed == true ? "line-through" : "",
                    }}
                  >
                    {val.todo}
                  </p>
                  <p className="pl-3">{val.dates}</p>
                  <Button onClick={() => handleDeleteListItem(key)}>X</Button>
                </div>
              );
            })
        : todoItem.map((val, key) => {
            return (
              <div style={{ backgroundColor: "#66a3ff", marginTop: "10px" }}>
                {/* <input
                              checked={val.checked}
                              type="checkbox"
                              id={val.id}
                              value={val.todo}
                              name="title"
                              onClick={() => handleChecked(val.id, val.todo, val.completed)}
                             />    */}
                <Checkbox
                  checked={val.checked}
                  type="checkbox"
                  id={val.id}
                  value={val.todo}
                  name="title"
                  onClick={() => handleChecked(val.id, val.todo, val.completed)}
                  inputProps={{ "aria-label": "checkbox with default color" }}
                />
                <p
                  style={{
                    textDecoration: val.completed == true ? "line-through" : "",
                  }}
                >
                  {val.todo}
                </p>
                <p className="pl-3">{val.dates}</p>
                <Button onClick={() => handleDeleteListItem(key)}>X</Button>
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
