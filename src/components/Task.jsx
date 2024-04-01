//  Task.jsx

import { Left, Right } from '../Icons/ArrowIcons';

//  React-dnd
import { useDrag, useDragLayer } from 'react-dnd';
import CustomDragLayer from '../CustomDragLayer';

// COMPONENT
const Task = ({
  id,
  stateid,
  text,
  createdAt,
  handleMoveTask,
  totalColumns,
}) => {
  // Drag and Drop
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: { id: id, text: text },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const { item, offset } = useDragLayer((monitor) => ({
    isDragging: monitor.isDragging(),
    item: monitor.getItem(),
    offset: monitor.getSourceClientOffset(),
  }));

  return (
    <>
      {/* {isDragging && <CustomDragLayer item={item} offset={offset} />} */}

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
        <div className='taskContent'>
          <h3>{text}</h3>
          <p>{createdAt}</p>
        </div>

        <button
          className='navigateTaskBtn'
          onClick={() => handleMoveTask(id, stateid + 1)}
          disabled={stateid === totalColumns}>
          <Right />
        </button>
      </li>
    </>
  );
};

export default Task;
