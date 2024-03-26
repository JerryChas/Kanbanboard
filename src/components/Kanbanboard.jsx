import Column from '../components/Column';

//Drag and Drop
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Kanbanboard = () => {
  return (
    <main>
      <DndProvider backend={HTML5Backend}>
        <Column columnTitle={'Todo'} columnStatus={'todo'} />
        <Column columnTitle={'In Progress'} columnStatus={'inProgress'} />
        <Column columnTitle={'Done'} columnStatus={'done'} />
      </DndProvider>
    </main>
  );
};

export default Kanbanboard;
