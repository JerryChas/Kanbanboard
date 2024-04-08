//  App.jsx

//Components
import Footer from './components/Footer';
import Header from './components/Header';

// Pages
import Kanbanboard from './Kanbanboard';
import ColumnPage from './ColumnPage';
import Missing from './Missing';

//  React Router
import { Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';

//Drag and Drop
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <div className='App'>
      <Header />
      <DataProvider>
        <DndProvider backend={HTML5Backend}>
          <Routes>
            <Route index element={<Kanbanboard />} />
            <Route path='/columnPage/:columnId' element={<ColumnPage />} />
            <Route path='*' element={<Missing />} />
          </Routes>
        </DndProvider>
      </DataProvider>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
