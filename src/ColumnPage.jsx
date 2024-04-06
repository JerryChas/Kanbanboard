// ColumnPage.jsx

import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import Column from './components/Column';
import Task from './components/Task';
import DataContext from './context/DataContext';
import Modal from './components/Modal';

const ColumnPage = () => {
  // Context
  const {
    tasks,
    setTasks,
    columns,
    setColumns,
    selectedTask,
    isModalOpen,
    isColumnPage,
    setIsColumnPage,
    navigate,
  } = useContext(DataContext);

  //  Params
  const { columnId } = useParams(); // OBS! columnId is now a string

  // Hämtar props från Link
  const location = useLocation();
  const { columnIndex } = location.state;

  // State
  const [currentColumn, setCurrentColumn] = useState(null);

  useEffect(() => {
    {
      console.log(columnIndex);
    }

    // Hitta den aktuella kolumnen baserat på id från parametrarna
    const foundColumn = columns.find((col) => col.id === Number(columnId));
    setCurrentColumn(foundColumn);

    setIsColumnPage(true);

    return () => setIsColumnPage(false);
  }, [columns, columnId, setIsColumnPage, columnIndex]);

  return (
    <main>
      <Link to={'/'}>Go to Home</Link>

      {currentColumn && (
        <Column column={currentColumn} columnIndex={columnIndex} />
      )}
      {isModalOpen && selectedTask && <Modal />}
    </main>
  );
};

export default ColumnPage;
