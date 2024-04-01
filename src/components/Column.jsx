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
  columnIndex,
  columnId,
  tasks,
  setTasks,
  taskText,
  setTaskText,
  handleMoveTask,
  totalColumns,
}) => {
  // DROP
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'task',
    drop: (task) => handleMoveTask(task.id, columnId),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleNewTask = (e) => {
    e.preventDefault();
    const id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
    const date = new Date().getUTCDate();
    const newTask = { id, text: taskText, createdAt: date, stateid: 1 };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTaskText('');

    console.log(tasks); //! DEBUGG
  };

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
          .filter((task) => task.stateid === columnId) // Filtrera uppgifter baserat på column.id och tasks.stateid
          .map((task) => (
            <Task
              key={task.id}
              id={task.id}
              stateid={task.stateid}
              text={task.text}
              createdAt={task.createdAt}
              handleMoveTask={handleMoveTask}
              totalColumns={totalColumns}
            />
          ))}
      </ul>
      {/* ADD NEW TASK */}
      {columnIndex === 0 && (
        <form className='addTaskForm' onSubmit={handleNewTask}>
          <label htmlFor='addTask'>Add task</label>
          <input
            type='text'
            id='addTask'
            autoComplete='off'
            placeholder='Write here...'
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
          />
          {/* <button type='submit' onClick={handleSubmit}>
            Add
          </button> */}
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
