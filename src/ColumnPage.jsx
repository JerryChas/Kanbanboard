import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Column from './components/Column';
import Task from './components/Task';
import DataContext from './context/DataContext';

const ColumnPage = () => {
  // Context
  const { tasks, setTasks, columns, setColumns, navigate } =
    useContext(DataContext);

  //  Params
  const { columnId } = useParams(); // OBS! columnId is now a string

  //  State
  const [columnTasks, setColumnTasks] = useState([]);
  // const [currentColumn, setCurrentColumn] = useState({});

  const currentColumn = columns.find((col) => col.id == columnId);

  useEffect(() => {
    // Filtrera tasks baserat på den valda kolumnens id
    const filteredTasks = tasks.filter((task) => task.stateid == columnId);
    setColumnTasks(filteredTasks);
  }, [tasks, columnId]);

  // useEffect(() => {
  //   // Hitta kolumn baserat på den valda kolumnens id
  //   const filteredColumn = columns.find((col) => col.id == columnId);
  //   setCurrentColumn(filteredColumn);
  //   console.log(currentColumn);
  // }, [columns, columnId]);

  return (
    <main>
      {console.log(currentColumn) /* DEBUGG */}
      <div className='Column'>
        <div className='columnHeader'>
          <h2>{currentColumn.title}</h2>
          {/* {columnIndex !== 0 && (
            <button onClick={(e) => onDelete(columnId, e)} className='trashBtn'>
              <Trash />
            </button>
          )} */}
        </div>

        <ul className='taskList'>
          {tasks
            .filter((task) => task.stateid === columnId) // Filtrera uppgifter baserat på column.id och tasks.stateid
            .map((task) => (
              <Task
              // key={task.id}
              // id={task.id}
              // stateid={task.stateid}
              // title={task.title}
              // createdAt={task.createdAt}
              // editedAt={task.editedAt}
              // handleMoveTask={handleMoveTask}
              // handleToggleModal={handleToggleModal}
              // totalColumns={totalColumns}
              />
            ))}
        </ul>
      </div>

      <Link to={'/'}>Go to Home</Link>
    </main>
  );
};

export default ColumnPage;
