//  Task.jsx

import { Left, Right } from '../Icons/ArrowIcons';
import DataContext from '../context/DataContext';
import { useContext } from 'react';

//  React-dnd
import { useDrag } from 'react-dnd';

// COMPONENT
const Task = ({
  task: { id, stateid, title, body, createdAt, editedAt },
  index,
}) => {
  // Context
  const { handleToggleModal, handleMoveTask, columns } =
    useContext(DataContext);

  // Drag and Drop
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: { id: id, title: title },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <>
      <li
        className='Task'
        ref={drag}
        id={id}
        stateid={stateid}
        style={{ visibility: isDragging && 'hidden' }}>
        <button
          className='navigateTaskBtn'
          onClick={() => handleMoveTask(id, stateid - 1)}
          disabled={stateid === 1}>
          <Left />
        </button>
        <div className='taskContent' onClick={() => handleToggleModal(id)}>
          <h3>{title}</h3>
          {editedAt ? <p>{editedAt}</p> : <p>{createdAt}</p>}
        </div>

        <button
          className='navigateTaskBtn'
          onClick={() => handleMoveTask(id, stateid + 1)}
          disabled={stateid === columns.length}>
          <Right />
        </button>
      </li>
    </>
  );
};

export default Task;
