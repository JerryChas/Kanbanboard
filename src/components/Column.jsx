//  Column.jsx

//* IMPORTS
import Task from './Task.jsx';
import Trash from '../Icons/TrashIcon.jsx';
import ColorIcon from '../Icons/ColorIcon.jsx';

//  React-dnd
import { useDrop } from 'react-dnd';
import { Link } from 'react-router-dom';
import DataContext from '../context/DataContext';
import { useContext } from 'react';

//* COMPONENT
const Column = ({ column, columnIndex }) => {
  // Context
  const {
    tasks,
    setTasks,
    taskTitle,
    setTaskTitle,
    handleMoveTask,
    handleDeleteColumn,
  } = useContext(DataContext);

  // DROP
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'task',
    drop: (task) => handleMoveTask(task.id, column.id),
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
      body: '',
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
        to={`/columnPage/${column.id}?${column.title.replace(/\s+/g, '-')}`}
        className='columnLink noStyle'>
        <div className='columnHeader'>
          <h2>{column.title}</h2>
          {columnIndex !== 0 && (
            <button
              onClick={(e) => handleDeleteColumn(column.id, e)}
              className='trashBtn'>
              <Trash />
            </button>
          )}
        </div>
      </Link>

      <ul className='taskList'>
        {tasks
          .filter((task) => task.stateid === column.id) // Filtrera uppgifter baserat på column.id och tasks.stateid
          .map((task, index) => (
            <Task key={task.id} task={task} index={index} />
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
          {/* <button type='submit'>
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
