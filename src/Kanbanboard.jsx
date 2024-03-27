// Kanbanboard.jsx

import { useEffect, useState } from 'react';
import Column from './components/Column';
import taskList from './taskList.js';

//Drag and Drop
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PlusIcon from './Icons/PlusIcon';

const Kanbanboard = () => {
  const [columns, setColumns] = useState([
    { id: 1, title: 'To Do', tasks: [] },
    { id: 2, title: 'In Progress', tasks: [] },
    { id: 3, title: 'Done', tasks: [] },
  ]);

  useEffect(() => {
    const sortedColumns = columns.map((col) => {
      const columnTasks = taskList.filter((task) => task.stateId === col.id);
      return { ...col, tasks: columnTasks };
    });
    setColumns(sortedColumns);
  }, []);

  const handleAddColumn = () => {
    const id = columns.length ? columns[columns.length - 1].id + 1 : 1;
    const newCol = { id, title: `Column ${id}`, tasks: [] };
    const allColumns = [...columns, newCol];
    setColumns(allColumns);
  };

  console.log(columns);

  return (
    <main>
      <DndProvider backend={HTML5Backend}>
        {columns.map((col) => (
          <Column key={col.id} id={col.id} columnTitle={col.title} />
        ))}
        <button className='add-column_btn' onClick={() => handleAddColumn()}>
          <PlusIcon />
        </button>
      </DndProvider>
    </main>
  );
};

export default Kanbanboard;
