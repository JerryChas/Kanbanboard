//  App.jsx

// CSS

//Components
import Footer from './components/Footer';
import Header from './components/Header';

// Pages
import Kanbanboard from './Kanbanboard';
import ColumnPage from './ColumnPage';
import Missing from './Missing';

//  React Router
import { Routes, Route } from 'react-router-dom';

// COMPONENT
function App() {
  return (
    <div className='App'>
      <Header />

      <Routes>
        <Route path='/' element={<Kanbanboard />} />
        <Route path='/columnPage' element={<ColumnPage />} />
        <Route path='*' element={<Missing />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
