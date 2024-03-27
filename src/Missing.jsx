import React from 'react';
import { Link } from 'react-router-dom';

const Missing = () => {
  return (
    <main>
      <h2>Page not found</h2>
      <Link to='/'>Visit HomePage</Link>
    </main>
  );
};

export default Missing;
