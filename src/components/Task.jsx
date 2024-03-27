//  Task.jsx

//  React-dnd
import { useDrag, useDragLayer } from 'react-dnd';
import CustomDragLayer from '../CustomDragLayer';

// COMPONENT
const Task = ({ id, text, createdDate }) => {
  // Drag and Drop
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: { id: id, text: text },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const { item, offset } = useDragLayer((monitor) => ({
    isDragging: monitor.isDragging(),
    item: monitor.getItem(),
    offset: monitor.getSourceClientOffset(),
  }));

  return (
    <>
      {isDragging && <CustomDragLayer item={item} offset={offset} />}
      <div
        className='Task'
        ref={drag}
        id={id}
        style={{ visibility: isDragging && 'hidden' }}>
        <h3>{text}</h3>
        <p>{createdDate}</p>
      </div>
    </>
  );
};

export default Task;
