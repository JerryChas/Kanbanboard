// Kanbanboard.jsx

import { useContext } from 'react';
import Column from './components/Column';

import PlusIcon from './Icons/PlusIcon';
import Modal from './components/Modal.jsx';
import DataContext from './context/DataContext';

const Kanbanboard = () => {
  // Context
  const { columns, isModalOpen, selectedTask, handleAddColumn } =
    useContext(DataContext);

  return (
    <main>
      <div className='fadeEdge'></div>
      <div className='columnsContainer'>
        {columns.map((col, index) => (
          <Column
            key={col.id}
            columnIndex={index}
            column={col} // Whole columnObject
          />
        ))}
        <button className='addColumnBtn' onClick={() => handleAddColumn()}>
          <PlusIcon />
        </button>
      </div>
      <div className='fadeEdge'></div>

      {isModalOpen && selectedTask && <Modal />}
    </main>
  );
};

export default Kanbanboard;
