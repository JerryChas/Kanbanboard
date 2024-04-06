// DataContext.jsx

import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import taskList from '../taskList.js';

// Skapa en ny context
const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isColumnPage, setIsColumnPage] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskTitle, setTaskTitle] = useState('');
  const [tasks, setTasks] = useState(taskList);
  const [columns, setColumns] = useState([
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
  ]);

  //Navigate
  const navigate = useNavigate();

  // Functions
  const handleToggleModal = (TaskId) => {
    if (isModalOpen) {
      return setIsModalOpen(false);
    }
    const selectedTask = tasks.find((task) => task.id === TaskId);
    setSelectedTask(selectedTask);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (taskToDelete) => {
    setTasks(tasks.filter((t) => t !== taskToDelete));
    setIsModalOpen(false);
  };
  const handleDeleteColumn = (columnId, e) => {
    e.preventDefault();
    setColumns(columns.filter((c) => c.id !== columnId));
  };
  const handleAddColumn = () => {
    const id = columns.length ? columns[columns.length - 1].id + 1 : 1;
    const newCol = { id, title: `Column ${id}` };
    const allColumns = [...columns, newCol];
    setColumns(allColumns);
  };

  const handleMoveTask = (taskToMove, newState) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskToMove ? { ...task, stateid: newState } : task
      )
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
        navigate,
      }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
