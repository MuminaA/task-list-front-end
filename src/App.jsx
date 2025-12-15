import TaskList from './components/TaskList.jsx';
import './App.css';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];



const App = () => {
  // store tasks in state
  const[tasks, setTasks] = useState(TASKS);

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
  // const deleteTask = (id) => {
  //   setTasks(tasks.filter(task => task.id !== id));
  // };


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
            // onDeleteTask={deleteTask}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
