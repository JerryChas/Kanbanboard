import React from 'react';
import { Link } from 'react-router-dom';

const Missing = () => {
  return (
    <main className='MissingPage'>
      <h2>Page not found</h2>
      <h3>404</h3>
      <Link to='/'>Visit HomePage</Link>
    </main>
  );
};

export default Missing;
