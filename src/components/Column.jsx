//  Column.jsx

//* IMPORTS
import Task from './Task.jsx';
import Trash from '../Icons/TrashIcon.jsx';
import ColorIcon from '../Icons/ColorIcon.jsx';

//  React-dnd
import { useDrop } from 'react-dnd';
import { Link } from 'react-router-dom';

//* COMPONENT
const Column = ({
  columnTitle,
  columnIndex,
  columnId,
  tasks,
  setTasks,
  taskTitle,
  setTaskTitle,
  handleMoveTask,
  onDelete,
  handleToggleModal,
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
    const date = new Date();
    const newTask = {
      id,
      title: taskTitle,
      createdAt: date.toLocaleString(),
      stateid: 1,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTaskTitle('');
    console.log(tasks);
  };

  return (
    <div
      className='Column'
      ref={drop}
      style={{ boxShadow: isOver && '0 0 5px black' }}>
      <Link
        to={`/columnPage/${columnTitle.replace(/\s+/g, '')}`}
        className='columnLink noStyle'>
        <div className='columnHeader'>
          <h2>{columnTitle}</h2>
          {columnIndex !== 0 && (
            <button onClick={(e) => onDelete(columnId, e)} className='trashBtn'>
              <Trash />
            </button>
          )}
        </div>
      </Link>

      <ul className='taskList'>
        {tasks
          .filter((task) => task.stateid === columnId) // Filtrera uppgifter baserat på column.id och tasks.stateid
          .map((task) => (
            <Task
              key={task.id}
              id={task.id}
              stateid={task.stateid}
              title={task.title}
              createdAt={task.createdAt}
              editedAt={task.editedAt}
              handleMoveTask={handleMoveTask}
              handleToggleModal={handleToggleModal}
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
            placeholder='What to do..'
            required
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
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
