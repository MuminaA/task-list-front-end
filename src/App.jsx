import './App.css';
import TaskList from './components/TaskList.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';




// const TASKS = [
//   {
//     id: 1,
//     title: 'Mow the lawn',
//     isComplete: false,
//   },
//   {
//     id: 2,
//     title: 'Cook Pasta',
//     isComplete: true,
//   },
// ];



// Base URL for the Task List API
const kbaseURL = 'http://localhost:5000';

// Function to get all tasks from the API
const getAllTasksAPI = () => {
  return axios.get(`${kbaseURL}/tasks`)
    .then(response => response.data)
    .catch(error => console.log(error));
};

// Function to convert ONE API task format to frontend task format
const convertFromAPI = (apiTask) => {
  const newTask = {
    id: apiTask.id,
    title: apiTask.title,
    isComplete: apiTask.is_complete,
  };
  return newTask;
};



const App = () => {
  // state to hold tasks array
  const[tasks, setTasks] = useState([]);

  // loads tasks and updates state
  const getAllTasks = () => {
    return getAllTasksAPI()
      .then(tasks => {
        // Map over array and convert each task individually
        const newTasks = tasks.map(convertFromAPI);
        setTasks(newTasks);  // Update state
      });
  };

  // useEffect to load tasks on component mount
  useEffect(() => {
    getAllTasks();
  }, []);





  // function to toggle task completion
  const toggleComplete = (id) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return { ...task, isComplete: !task.isComplete };
      }
      return task;
    }));
  };

  // function to delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };


  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList
            tasks={tasks}
            onToggleComplete={toggleComplete}
            onDeleteTask={deleteTask}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
