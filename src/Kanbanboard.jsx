// Kanbanboard.jsx

import { useEffect, useState } from 'react';
import Column from './components/Column';
import taskList from './taskList.js';

//Drag and Drop
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PlusIcon from './Icons/PlusIcon';

const Kanbanboard = () => {
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
  };

  //! DEBUGG
  // useEffect(() => {
  //   console.clear();
  //   tasks.map((t) => console.log(t.text, t.stateid));
  // }, [tasks]);

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

  return (
    <main>
      <DndProvider backend={HTML5Backend}>
        <div className='fadeEdge'></div>
        <div className='columnsContainer'>
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
              totalColumns={columns.length}
            />
          ))}
          <button className='addColumnBtn' onClick={() => handleAddColumn()}>
            <PlusIcon />
          </button>
        </div>
        <div className='fadeEdge'></div>
      </DndProvider>
    </main>
  );
};

export default Kanbanboard;
