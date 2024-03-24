//  Task.jsx

//  React-dnd
import { useDrag } from 'react-dnd';

// COMPONENT
const Task = ({ id, text, createdDate }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: { id: id, text: text },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      className='task'
      ref={drag}
      id={id}
      style={{ display: isDragging && 'none' }}>
      <h3>{text}</h3>
      <p>{createdDate}</p>
    </div>
  );
};

export default Task;
