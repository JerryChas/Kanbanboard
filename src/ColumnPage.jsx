import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Column from './components/Column';

const ColumnPage = () => {
  const { title } = useParams();

  return (
    <main>
      <p>columnPage</p>
      <Link to={'/'}>Go to Home</Link>
    </main>
  );
};

export default ColumnPage;
