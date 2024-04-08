// ColumnPage.jsx

import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Column from './components/Column';
import DataContext from './context/DataContext';
import Modal from './components/Modal';
import BackIcon from './Icons/BackIcon';

const ColumnPage = () => {
  // Context
  const { columns, selectedTask, isModalOpen, setIsColumnPage } =
    useContext(DataContext);

  //  Params
  const { columnId } = useParams(); // OBS! columnId is now a string

  // State
  const [currentColumn, setCurrentColumn] = useState(null);
  const [currentColumnIndex, setCurrentColumnIndex] = useState(null);

  useEffect(() => {
    // Find index of current column
    const foundIndex = columns.findIndex((col) => col.id === Number(columnId));
    // Find current column
    const foundColumn = columns[foundIndex];

    setCurrentColumn(foundColumn);
    setCurrentColumnIndex(foundIndex);
    setIsColumnPage(true);

    return () => setIsColumnPage(false);
  }, [columns, columnId, setIsColumnPage]);

  return (
    <main className='ColumnPage'>
      <Link to={'/'}>
        <div className='backButton'>
          <BackIcon />
        </div>
      </Link>

      {currentColumn && (
        <Column column={currentColumn} columnIndex={currentColumnIndex} />
      )}
      {isModalOpen && selectedTask && <Modal />}
    </main>
  );
};

export default ColumnPage;
