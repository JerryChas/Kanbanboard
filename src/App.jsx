//  App.jsx

// CSS
import './components/task/task.css';
import './components/column/column.css';

//Components
import Footer from './components/Footer';
import Header from './components/Header';
import Column from './components/column/Column';

//Drag and Drop
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// COMPONENT
function App() {
  //*  --------- FUNCTIONS ---------  *//
  function handleModal() {
    console.log('modalen visas med Task: '); //! DEBUGG
  }

  return (
    <div className='App'>
      <Header />
      <main>
        <DndProvider backend={HTML5Backend}>
          <Column columnTitle={'Todo'} columnStatus={'todo'} />
          <Column columnTitle={'In Progress'} columnStatus={'inProgress'} />
          <Column columnTitle={'Done'} columnStatus={'done'} />
        </DndProvider>
      </main>
      <Footer />
    </div>
  );
}

export default App;
