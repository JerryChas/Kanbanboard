// Kanbanboard.jsx

import { useContext, useRef, useState } from 'react';
import Column from './components/Column';
import taskList from './taskList.js';

//Drag and Drop
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PlusIcon from './Icons/PlusIcon';
import Modal from './components/Modal.jsx';
import DataContext from './context/DataContext';

const Kanbanboard = () => {
  // Context
  const {
    tasks,
    setTasks,
    columns,
    setColumns,
    isModalOpen,
    setIsModalOpen,
    selectedTask,
    setSelectedTask,
    taskTitle,
    setTaskTitle,
    handleAddColumn,
    handleMoveTask,
  } = useContext(DataContext);

  return (
    <main>
      <DndProvider backend={HTML5Backend}>
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
      </DndProvider>

      {isModalOpen && selectedTask && <Modal />}
    </main>
  );
};

export default Kanbanboard;
