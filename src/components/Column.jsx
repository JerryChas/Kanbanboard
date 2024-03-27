//  Column.jsx

//* IMPORTS
import Task from './Task.jsx';
import tasklist from '../taskList.js';

//  React-dnd
import { useDrop } from 'react-dnd';
import { useState } from 'react';

//* COMPONENT
const Column = ({ columnTitle, id }) => {
  const [tasks, setTasks] = useState(tasklist);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'task',
    drop: (task) => moveTask(task.id, id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const moveTask = (taskId, columnId) => {
    console.log(`Moved task ${taskId} to column: "${columnId}"`); //! DEBUGG
    const taskToMove = tasks.find((task) => task.id === taskId);
    console.log(taskToMove); //! DEBUGG
  };

  const filteredTasks = tasks.filter((task) => task.stateId == id);

  const handleClick = () => {
    console.log('create new task');
  };

  return (
    <div
      className='Column'
      ref={drop}
      style={{ boxShadow: isOver && '0 0 5px black' }}>
      <h2>{columnTitle}</h2>

      {filteredTasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          text={task.text}
          createdDate={task.createdDate}
        />
      ))}

      {id === 1 && <button onClick={handleClick}>Create new Task</button>}
    </div>
  );
};

export default Column;
