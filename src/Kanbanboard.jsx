// Kanbanboard.jsx

import { useEffect, useRef, useState } from 'react';
import Column from './components/Column';
import taskList from './taskList.js';

//Drag and Drop
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PlusIcon from './Icons/PlusIcon';
import Modal from './components/Modal.jsx';

const Kanbanboard = () => {
  const columnsContainerRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState(taskList);
  const [taskText, setTaskText] = useState('');
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

  const handleAddColumn = () => {
    const id = columns.length ? columns[columns.length - 1].id + 1 : 1;
    const newCol = { id, title: `Column ${id}` };
    const allColumns = [...columns, newCol];
    setColumns(allColumns);

    //! Får den inte till att scrolla till slutet
    console.log(columnsContainerRef.current);
    if (columnsContainerRef.current) {
      columnsContainerRef.current.scrollLeft =
        columnsContainerRef.current.scrollWidth;
    }
  };

  const handleMoveTask = (taskToMove, newState) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskToMove ? { ...task, stateid: newState } : task
      )
    );
  };

  const handleSubmit = () => {
    console.log('create new task');
  };

  const handleModalPopup = (TaskId) => {
    console.log('Show in modal', TaskId);
    const selectedTask = tasks.find((task) => task.id === TaskId);

    setSelectedTask(selectedTask);
    setIsModalOpen(true);
  };

  return (
    <main>
      <DndProvider backend={HTML5Backend}>
        <div className='fadeEdge'></div>
        <div ref={columnsContainerRef} className='columnsContainer'>
          {columns.map((col, index) => (
            <Column
              key={col.id}
              columnIndex={index}
              columnId={col.id}
              columnTitle={col.title}
              tasks={tasks}
              setTasks={setTasks}
              taskText={taskText}
              setTaskText={setTaskText}
              handleSubmit={handleSubmit}
              handleMoveTask={handleMoveTask}
              handleModalPopup={handleModalPopup}
              totalColumns={columns.length}
            />
          ))}
          <button className='addColumnBtn' onClick={() => handleAddColumn()}>
            <PlusIcon />
          </button>
        </div>
        <div className='fadeEdge'></div>
      </DndProvider>

      {isModalOpen && selectedTask && (
        <Modal text={selectedTask.text} createdAt={selectedTask.createdAt} />
      )}
    </main>
  );
};

export default Kanbanboard;
