import {
  FaPlus,
  FaSearch,
  FaCheck,
  FaPencilAlt,
  FaTrash,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { CreateTask, DeleteTaskById, GetAllTask, UpdateTaskById } from "../service/api.js";
import { notify } from "../utils/api.js";
const AppLayout = () => {
  const [input, setInput] = useState(" ");
  const [tasks, setTasks] = useState([]);
  const [copyTasks, setCopyTask] = useState([]);
  const [updateTask ,setUpdateTask]=useState(null);
  const handleTask = () => {
    if (updateTask && input) {
        //upadte api call
        console.log('update api call');
        const obj = {
            taskName: input,
            isDone: updateTask.isDone,
            _id: updateTask._id
        }
        updateTasks(obj);
        setUpdateTask(null)
        setInput("")
    }else if(updateTask===null && input){
     // call create task api 

     handleAddTask();
     setInput("")
    }
  }
  // set input for update task
  useEffect(()=>{
    if(updateTask)
     setInput(updateTask.taskName)
  } ,[updateTask])
  const handleAddTask = async () => {
    const obj = {
      taskName: input,
      isDone: false,
    };

    try {
      const { success, msg } = await CreateTask(obj);

      if (success) {
        //  show success toast
        notify(msg, "success");
        fetchAllTask();
      } else {
        // show err toast
        notify(msg, "error");
      }
    } catch (err) {
      console.error(err);
      notify("failed to create task", "error");
    }
  };
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    const oldTasks = [...copyTasks];
    const results = oldTasks.filter((item) => item.taskName.toLowerCase().includes(term));
    setTasks(results);
}
  const fetchAllTask = async () => {
    const { data } = await GetAllTask();
    console.log(data);
    setTasks(data);
    setCopyTask(data);
  };
  useEffect(() => {
    fetchAllTask();
  }, []);
  

  // delete task
  const deleteTask = async (id) => {
    try {
      const { success, msg } = await DeleteTaskById(id);
      if (success) {
        notify(msg, "success");
        fetchAllTask();
      } else {
        notify(msg, "error");
      }
    } catch (err) {
      console.error(err);
      notify("failed to delete task", "error");
    }
  };

  //update task
  const updateTasks = async (item) => {
    const { _id, isDone, taskName } = item;
    const obj = {
        taskName,
        isDone: isDone
    }
    try {
      const { success, msg } = await UpdateTaskById(_id ,obj);
      if (success) {
        notify(msg, "success");
        fetchAllTask();
      } else {
        notify(msg, "error");
      }
    } catch (err) {
      console.error(err);
      notify("failed to delete task", "error");
    }
  };
  // check task
  const checkTask = async (item) => {
    const { taskName, _id, isDone } = item;
    const obj = {
      taskName: taskName,
      isDone: !isDone
    };
    try {
      const { success, msg } = await UpdateTaskById(_id ,obj);
      if (success) {
        notify(msg, "success");
        fetchAllTask();
      } else {
        notify(msg, "error");
      }
    } catch (err) {
      console.error(err);
      notify("failed to delete task", "error");
    }
  };
  return (
    <>
      <div className=" d-flex flex-column align-items-center">
        <h1>Task Manager App</h1>
        <div className=" d-flex justify-content-between align-items-center mb-4 w-100">
          <div className="input-group flex-grow-1 me-1">
            <input
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              className="form-control me-1"
              type="text"
              placeholder="what is your task"
            />
            <button
              onClick={handleTask}
              type="submit"
              className="btn btn-success btn-sm me-2 "
            >
              <FaPlus />
            </button>
          </div>
          <div className="input-group flex-grow-1 ">
            <span className="input-group-text">
              <FaSearch />
            </span>
            <input
            onChange={handleSearch}
              className="form-control me-1"
              type="search"
              placeholder="search task"
            />
          </div>
        </div>
        {/* list of tasks */}
        <div className="d-flex flex-column w-100">
          {tasks.map((item) => {
            return (
              <div
                key={item._id}
                className="m-2 p-2 border bg-light w-100 rounded-3 d-flex justify-content-between align-items-center"
              >
                <span
                  className={
                    item.isDone ? "text-decoration-line-through " : ""
                  }
                >
                  {item.taskName}
                </span>
                <div className="">
                  <button
                    onClick={() => {
                      checkTask(item);
                    }}
                    className="btn btn-success btn-sm me-2"
                    type="button"
                  >
                    {" "}
                    <FaCheck />
                  </button>
                  <button 
                   onClick={()=>{setUpdateTask(item);}}
                  className="btn btn-primary btn-sm me-2" type="button">
                    {" "}
                    <FaPencilAlt />
                  </button>
                  <button
                    onClick={() => {
                      deleteTask(item._id);
                    }}
                    className="btn btn-danger btn-sm me-2"
                    type="button"
                  >
                    {" "}
                    <FaTrash />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* toastify */}
        <ToastContainer
          position="top-right"
          autoclose={3000}
          highProgessBar={false}
        />
      </div>
    </>
  );
};
export default AppLayout;
