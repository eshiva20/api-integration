import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [todos, setTodos] = useState([])
  const [todoInput, setTodoInput] = useState({
    id: "",
    todo: ""
  })
  const [todoID, setTodoID] = useState();
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    getData()
  }, []);

  const getData = async () => {
    await axios.get("http://localhost:8080/data")
      .then((res) => setTodos(res.data))
      .catch((err) => console.log("getData Err", err))
  }

  const addData = async () => {
    if (!todoInput.todo) {
      alert("Cannot add Empty Todo")
    } else {
      if (!editMode) {
        await axios.post("http://localhost:8080/data", todoInput)
          .then((res) => getData())
          .catch((err) => console.log("postData Err", err))
        todoInput.todo = ""
      } else {
        await axios.put(`http://localhost:8080/data/${todoID}`, todoInput)
          .then((res) => getData())
          .catch((err) => console.log("EditData Err", err))
        setEditMode(false)
        todoInput.todo = ""
      }
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure want to delete ?")) {
      await axios.delete(`http://localhost:8080/data/${id}`)
        .then((res) => getData())
        .catch((err) => console.log("deleteData Err", err))
    }
  }

  const handleEdit = async (id) => {
    const singleTodo = todos.find((elem) => elem.id == id)
    setTodoInput({ ...singleTodo })
    setTodoID(id)
    setEditMode(true)
  }

  return (
    <>
      <div className='main'>
        <div className="input">
          <input onChange={(e) => setTodoInput({ todo: e.target.value })} value={todoInput.todo} type="text" placeholder='Add Todo' name="todo" id="" />
          <button className='add-btn' onClick={addData} >
            {!editMode?"Add Todo":"Update Todo"}
          </button>
        </div>

        {todos && todos.map((Elem) => {
          return (
            <div key={Elem.id} className="todo-lists">
              <div className="single-todo">
                <span>{Elem.todo}</span>
                <div className="action-btns">
                  <button className='edit-btn' onClick={() => handleEdit(Elem.id)}>Edit</button>
                  <button className='delete-btn' onClick={() => handleDelete(Elem.id)}>Delete</button>
                </div>
              </div>
            </div>
          )
        })}

      </div>
    </>
  );
}

export default App;