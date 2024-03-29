//  Column.jsx

//* IMPORTS
import Task from './Task.jsx';
import Trash from '../Icons/TrashIcon.jsx';
import ColorIcon from '../Icons/ColorIcon.jsx';

//  React-dnd
import { useDrop } from 'react-dnd';

//* COMPONENT
const Column = ({
  columnTitle,
  id,
  tasks,
  newTask,
  setNewTask,
  handleSubmit,
  handleMoveTask,
  totalColumns,
}) => {
  // DROP
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'task',
    drop: (task) => handleMoveTask(task.id, id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      className='Column'
      ref={drop}
      style={{ boxShadow: isOver && '0 0 5px black' }}>
      <div className='columnHeader'>
        <h2>{columnTitle}</h2>
        <button className='trashBtn'>
          <Trash />
        </button>
      </div>

      <ul className='taskList'>
        {tasks
          .filter((task) => task.stateid === id) // Filtrera uppgifter baserat på column.id och tasks.stateid
          .map((task) => (
            <Task
              key={task.id}
              id={task.id}
              stateid={task.stateid}
              text={task.text}
              createdDate={task.createdDate}
              handleMoveTask={handleMoveTask}
              totalColumns={totalColumns}
            />
          ))}
      </ul>
      {id === 1 && (
        <form className='addTaskForm' onSubmit={(e) => e.preventDefault()}>
          <label htmlFor='addTask'>Add task</label>
          <input
            type='text'
            id='addTask'
            autoComplete='off'
            placeholder='New Task...'
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button type='submit' onClick={handleSubmit}>
            Add
          </button>
        </form>
      )}

      <div className='columnFooter'>
        <div className='ColorPaletteBtn'>
          <ColorIcon />
        </div>
      </div>
    </div>
  );
};

export default Column;
