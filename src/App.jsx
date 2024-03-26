//  App.jsx

// CSS

//Components
import Footer from './components/Footer';
import Header from './components/Header';
import Kanbanboard from './components/Kanbanboard';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// COMPONENT
function App() {
  return (
    <div className='App'>
      <Header />

      <Kanbanboard />
      <Footer />
    </div>
  );
}

export default App;
