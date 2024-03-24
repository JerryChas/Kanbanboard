//  Column.jsx

//* IMPORTS
import Task from '../task/Task';
import tasklistArray from '../../taskList.js';

//  React-dnd
import { useDrop } from 'react-dnd';
import { useState } from 'react';

//* COMPONENT
const Column = ({ columnTitle, columnStatus }) => {
  const [taskList, setTaskList] = useState(tasklistArray);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'task',
    drop: (t) => moveTask(t.id, columnStatus),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const moveTask = (id, status) => {
    console.log(`Moved task ${id} to: "${status}"`); //! DEBUGG
  };

  const filteredTasks = taskList.filter((task) => task.status === columnStatus);

  return (
    <div
      className='column'
      ref={drop}
      style={{ boxShadow: isOver && '0 0 5px black' }}>
      <h2>{columnTitle}</h2>

      {filteredTasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          text={task.text}
          createdDate={task.createdDate}
          status={task.status}
        />
      ))}

      {columnStatus === 'todo' && <button>Create new Task</button>}
    </div>
  );
};

export default Column;
