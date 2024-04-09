// DataContext.jsx

import { createContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Importera standardstilmall
import taskList from '../taskList.js';
import { getData, saveData } from '../localStorage.js';
import { Right } from '../Icons/ArrowIcons.jsx';

// Skapa en ny context
const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isColumnPage, setIsColumnPage] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskTitle, setTaskTitle] = useState('');
  //Get Data form localstorage or default list.
  const [tasks, setTasks] = useState(getData('TASKS') || taskList);
  const [columns, setColumns] = useState(
    getData('COLUMNS') || [
      {
        id: 1,
        title: 'To Do',
      },
      {
        id: 2,
        title: 'In Progress',
      },
      {
        id: 3,
        title: 'Done',
      },
    ]
  );

  const containerRef = useRef(null);

  // Save Data to localStorage whenever tasks or columns are updated
  useEffect(() => {
    saveData(columns, 'COLUMNS');
    saveData(tasks, 'TASKS');
  }, [columns, tasks]);

  //Navigate
  const navigate = useNavigate();

  //********** FUNCTIONS **********//

  //* TOGGLE MODAL
  const handleToggleModal = (TaskId) => {
    if (isModalOpen) {
      return setIsModalOpen(false);
    }
    const selectedTask = tasks.find((task) => task.id === TaskId);
    setSelectedTask(selectedTask);
    setIsModalOpen(true);
  };

  //* MOVE TASK
  const handleMoveTask = (taskToMove, newState) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskToMove ? { ...task, stateid: newState } : task
      )
    );
  };
  //* DELETE TASK
  const handleDeleteTask = (taskToDelete) => {
    setTasks(tasks.filter((t) => t !== taskToDelete));
    setIsModalOpen(false);
  };

  //* ADD COLUMN
  const handleAddColumn = () => {
    const id = columns.length ? columns[columns.length - 1].id + 1 : 1;
    const newCol = { id, title: `Column ${id}` };
    const allColumns = [...columns, newCol];

    updateColumnIds();
    setColumns(allColumns);

    // Scroll to the end som columnContainer
    setTimeout(() => {
      if (containerRef.current) {
        const scrollWidth = containerRef.current.scrollWidth;
        console.log('after press' + scrollWidth); //! DEBUGG
        containerRef.current.scrollTo({
          left: scrollWidth,
          behavior: 'smooth',
        });
      } else {
        console.log('No valid container found');
      }
    }, 100);
  };
  //* DELETE COLUMN
  const handleDeleteColumn = (columnId, e) => {
    e.preventDefault();

    // Alert if column contains tasks and
    const tasksInColumn = tasks.filter((task) => task.stateid === columnId);
    console.log(tasksInColumn);
    console.log(columns);
    if (tasksInColumn.length > 0) {
      confirmAlert({
        title: 'Warning',
        message:
          'This action will move all tasks in this column to the first.  Do you want to continue?',
        buttons: [
          {
            label: 'Do it!',
            onClick: () => {
              tasksInColumn.map((task) => handleMoveTask(task.id, 1));
              setColumns(columns.filter((c) => c.id !== columnId));
              updateColumnIds();
              updateTaskStateIds(columnId);
              navigate('/');
            },
          },
          {
            label: 'Abort',
            onClick: () => {
              return;
            },
          },
        ],
      });
    } else {
      setColumns(columns.filter((c) => c.id !== columnId));
      updateColumnIds();
      updateTaskStateIds(columnId);
      navigate('/');
    }
  };

  //* UPDATING TASK STATE AND COLUMN IDS *//
  //useful when deleting och adding columns.
  const updateColumnIds = () => {
    setColumns((prevColumns) =>
      prevColumns.map((column, index) => ({
        ...column,
        id: index + 1,
      }))
    );
  };
  const updateTaskStateIds = (deletedColumnId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.stateid > deletedColumnId) {
          return { ...task, stateid: task.stateid - 1 };
        }
        return task;
      })
    );
  };

  return (
    <DataContext.Provider
      value={{
        tasks,
        setTasks,
        columns,
        setColumns,
        isColumnPage,
        setIsColumnPage,
        isModalOpen,
        setIsModalOpen,
        selectedTask,
        setSelectedTask,
        taskTitle,
        setTaskTitle,
        handleToggleModal,
        handleMoveTask,
        handleDeleteTask,
        handleAddColumn,
        handleDeleteColumn,
        containerRef,
        navigate,
      }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
