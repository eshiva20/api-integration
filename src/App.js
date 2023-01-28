import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState({
    id: "",
    todo: "",
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("http://localhost:8080/data/")
      .then((res) => setTodos(res.data))
      .catch((error) => console.error("Error:", error));
  };

  const addTodo = async () => {
    if (!todoInput.todo) {
      alert("Add todo");
    } else {
      await axios
        .post("http://localhost:8080/data/", todoInput)
        .then((res) => getData())
        .catch((err) => console.log("Add Error", err));
      todoInput.todo = "";
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are You Sure wanted to Delete ?")) {
      await axios
        .delete(`http://localhost:8080/data/${id}`)
        .then((res) => getData())
        .catch((err) => console.log("Delete Error", err));
    }
  };

  return (
    <div className="main">
      <div className="input">
        <input
        placeholder="Add Todo"
          onChange={(e) => {
            setTodoInput({ todo: e.target.value });
          }}
          type="text"
          value={todoInput.todo}
        />
        <button  onClick={addTodo}>Add Todo</button>
      </div>

      {todos ? (
        todos.map((elem) => {
          return (
            <div className="todo" key={elem.id}>
              <span>{elem.todo}</span>
              <div className="btns">
                <button  style={{backgroundColor:"red", color:"white",padding:"5px 10px",borderRadius:"5px",border:"none"}} onClick={() => handleDelete(elem.id)}>Delete</button>
              </div>
            </div>
          );
        })
      ) : (
        <h1>No Data Found</h1>
      )}
    </div>
  );
}

export default App;
