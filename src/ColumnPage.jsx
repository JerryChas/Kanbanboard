// ColumnPage.jsx

import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import Column from './components/Column';
import DataContext from './context/DataContext';
import Modal from './components/Modal';

const ColumnPage = () => {
  // Context
  const { columns, selectedTask, isModalOpen, setIsColumnPage } =
    useContext(DataContext);

  //  Params
  const { columnId } = useParams(); // OBS! columnId is now a string

  // Get props from Link
  const location = useLocation();
  const { columnIndex } = location.state;

  // State
  const [currentColumn, setCurrentColumn] = useState(null);

  useEffect(() => {
    // Hitta den aktuella kolumnen baserat på id från parametrarna
    const foundColumn = columns.find((col) => col.id === Number(columnId));
    setCurrentColumn(foundColumn);

    setIsColumnPage(true);

    return () => setIsColumnPage(false);
  }, [columns, columnId, setIsColumnPage]);

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
